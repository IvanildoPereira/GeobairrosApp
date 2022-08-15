const Product = require("../models/Product");
const Address = require("../models/Address");
const User = require("../models/User");
const Image = require("../models/Image")
const fs = require('fs');
const HttpError = require("../models/http-error");
const {Op, Sequelize, where} = require("sequelize");
const UserFollower = require("../models/UserFollower");
require('dotenv/config');


const createProduct = async (req, res, next) => {
    const { name, description, price, type, whatsapp, link, addressId} = req.body;
    
    const user = await User.findByPk(req.userData.id);
    if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

    try {
    const product = await Product.create({
        name,
        description,
        price, 
        type,
        whatsapp,
        link,
        user_id: req.userData.id,
        address_id: addressId
    });
    
    await Image.bulkCreate(
      req.files.map((image) => {
        image = { 
            filename: image.path,
            path: image.path,
            product_id: product.id 
        };
        return image;
      })
    )

    const image = await product.getImages(); 
    const address = await product.getAddress();   
    res.json({ message: "Created with Success!", product, address, image });

    } catch (err) {
      const error =  new HttpError("It wasn't possible save the Product!" + err, 500);
      return next(error);
    }
};


const editProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price, type, whatsapp, link, addressId, images} = req.body;

  const user = await User.findByPk(req.userData.id);
  if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

  const product = await Product.findByPk(productId)

  console.log(productId)

  try {
  await product.update({
      name,
      description,
      price, 
      type,
      whatsapp,
      link,
      user_id: req.userData.id,
      address_id: addressId
  });

  const imageOld = await product.getImages(); 
  imageOld.forEach(async(image) => {
    let isImage
    if(typeof images !== 'string' && images){
      isImage = images.some(el => image.path === el);
    }else{
      isImage = images === image.path;
    }
    
    if(!isImage){
      await Image.destroy({where: {path: image.path}})
      if (fs.existsSync(image.path)) {
        fs.unlink(image.path, err => {
            if(err){
                return next(new HttpError('Somethinh goes wrong on file system.', 500));
            }
        });
    }
    }
  });

  if(req.files){
    await Image.bulkCreate(
      req.files.map((image) => {
        image = { 
            filename: image.path,
            path: image.path,
            product_id: product.id 
        };
        return image;
      })
    )
  }
  

  res.json({ message: "Created with Success!"});

  } catch (err) {
    const error =  new HttpError("It wasn't possible update the Product!" + err, 500);
    return next(error);
  }
};

const feed = async(req, res, next) =>{
  const {latitude, longitude} = req.body
  const user = await User.findByPk(req.userData.id);
  if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

  let options = {}

  options.order = [["updatedAt", "DESC"]]

  options.include = [{association: "images", attributes: ["id","path"]}, {association: "userProduct", attributes: ["id","name", "avatar_img"]}];

  if(latitude && longitude){
    location = Sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)`);
    distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.literal(`ST_GeomFromText(CONCAT('POINT (', Longitude, ' ', Latitude,')'), 4326)`), location);
    options.include.push({
      association: "address", 
      attributes: ['id', [distance, 'distancia'], 'logradouro', 'bairro', 'cidade', 'uf', 'latitude', 'longitude'],
      where: {[Op.or]:[{
        user_id:{
          [Op.in]:[Sequelize.literal('SELECT `Follows`.follower_id FROM `user_followers` AS `Follows` WHERE `Follows`.user_id='+user.id)]
        }
      },
      {
        [Sequelize.col('distancia')]: Sequelize.where(distance, {[Op.lte]: 5000}),
      }
    ]},
      required: true
    })
  }else{
    options.where = {
      user_id:{
        [Op.in]:[Sequelize.literal('SELECT `Follows`.follower_id FROM `user_followers` AS `Follows` WHERE `Follows`.user_id='+user.id)]
      }
    }
  }  

  const product = await Product.findAll(options);
  

  res.json({product});
}


const getProduct = async(req,res,next) =>{
  const { productId } = req.params;
  const product = await Product.findByPk(productId);
  const images = await product.getImages();
  const user = await product.getUserProduct();
  const address = await product.getAddress();

  const imagesUri = images.map((image, index) =>{
    image = {
      path: image.path,
      uri: process.env.API_URL + image.path
    }
    return image
  })

  user.avatar_img = process.env.API_URL + user.avatar_img;
  
  if(address.fachada_img){
    address.fachada_img = process.env.API_URL + address.fachada_img;
  } 



  res.json({product, user, imagesUri, address});
}

const getProductsNearest = async(req, res) =>{
  const { search } = req.query;
  const {latitude, longitude} = req.body
  let whereFind;

  if (search) {
    whereFind = {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          }
        },
        {
          description: {
            [Op.like]: "%" + search + "%"
          }
        }
      ]
    };
  }

  let location = Sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})', 4326)`);
  let distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.literal(`ST_GeomFromText(CONCAT('POINT (', Longitude, ' ', Latitude,')'), 4326)`), location);

  const locais = await Product.findAll({
    where: whereFind,
    include: [
      {
        association: "address", 
        attributes: ['id', [distance, 'distancia'], 'fachada_img', 'logradouro', 'bairro', 'cidade', 'uf', 'latitude', 'longitude'],
        where: Sequelize.where(distance, {[Op.lte]: 5000}),
      },
      {association: "userProduct", attributes: ["id","name"]},
      {association: "images", attributes: ["id","path"]}
    ]
  })

  res.json(locais)
}  

const getOwnerProducts = async (req, res, next) =>{
  const { type, search, userOwnerId } = req.query;
  const user = await User.findByPk(req.userData.id);
  if (!user) return res.status(404).json({ Message: "User doesn't exist!" });
  
  let owner = user.id;

  if(userOwnerId){
    owner = userOwnerId
  }

  let options = {
    where:{
      user_id: owner
    },
    include: {association: "images", attributes: ["id","path"]}
  }

  if(type){
    options.where.type = type;
  }

  if (search) {
    options.where = {
      ...options.where,
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          }
        },
        {
          description: {
            [Op.like]: "%" + search + "%"
          }
        }
      ]
    };
  }

  const products = await Product.findAll(options);
  res.json(products);
} 

const deleteProduct = async (req, res, next)=>{
  const { productId } = req.params;
  const user = await User.findByPk(req.userData.id);
  if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

  const product = await Product.findByPk(productId);
  if(product.user_id !== user.id){
    return res.status(404).json({ Message: "The product belongs to other user, you can't delete it!" });
  }
  await product.destroy();
  res.json("Produto deletado");
}


exports.createProduct = createProduct;
exports.editProduct = editProduct;
exports.feed = feed;
exports.getProduct = getProduct;
exports.getProductsNearest = getProductsNearest;
exports.getOwnerProducts = getOwnerProducts;
exports.deleteProduct = deleteProduct;

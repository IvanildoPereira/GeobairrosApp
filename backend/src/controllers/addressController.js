const Address = require("../models/Address");
const User = require("../models/User");
const HttpError = require("../models/http-error");


const createAddress = async (req, res, next) => {
    const { logradouro, bairro, cidade, uf, latitude, longitude } = req.body;
    let fachada_img = null;
    const user = await User.findByPk(req.userData.id);
    if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

    if(req.file){
      fachada_img = req.file.path;
    }

    try {
      const address = await Address.create({
        fachada_img,
        logradouro,
        bairro,
        cidade,
        uf,
        latitude,
        longitude,
        user_id: req.userData.id,
      });
      res.json({ message: "Created with Success!", address });
    } catch (err) {
      const error =  new HttpError("It wasn't possible save the Address!" + err, 500);
      return next(error);
    }
};


const getAddress = async (req, res, next) => {
  const { addressId } = req.params;
  const user = await User.findByPk(req.userData.id);
  if (!user) return res.status(404).json({ Message: "User doesn't exist!" });
  
  const address = await user.getAddresses({where:{id: addressId}});
  if (!address) return res.json("Não encontramos o endereço!");
  res.json(address);
};


const getAddresses = async (req, res, next) => {
    const user = await User.findByPk(req.userData.id);
    if (!user) return res.status(404).json({ Message: "User doesn't exist!" });
    
    const address = await user.getAddresses();
    if (!address) return res.json("Não há Endereços cadastrados!");
    res.json(address);
};

const updateAddress = async(req, res, next)=>{
  const { addressId } = req.params;
  const { logradouro, bairro, cidade, uf } = req.body;
  let fachada_img = null;

  const user = await User.findByPk(req.userData.id);
  if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

  const address = await Address.findByPk(addressId);

  fachada_img = address.fachada_img;

  if(address.user_id !== user.id){
    return res.status(404).json({ Message: "The address belongs to other user, you can't update it!" });
  }

  if (req.file) {
    fachada_img = req.file.path;
  }

  try{
    await address.update({
      fachada_img,
      logradouro,
      bairro,
      cidade, 
      uf
    });
    
    res.json("Updated with success!")
  } catch(err){
    const error = new HttpError("It wasn't possible update the address!", 500);
    return next(error)
  }



}

const deleteAddress = async (req, res, next)=>{
  const { addressId } = req.params;
  const user = await User.findByPk(req.userData.id);
  if (!user) return res.status(404).json({ Message: "User doesn't exist!" });

  const address = await Address.findByPk(addressId);
  if(address.user_id !== user.id){
    return res.status(404).json({ Message: "The address belongs to other user, you can't delete it!" });
  }
  await address.destroy();
  res.json("Endereço deletado");
}

exports.createAddress = createAddress;
exports.getAddress = getAddress;
exports.updateAddress = updateAddress;
exports.getAddresses = getAddresses;
exports.deleteAddress = deleteAddress;

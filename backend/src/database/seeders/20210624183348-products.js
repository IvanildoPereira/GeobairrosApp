'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('products',
    [
      {
        name: 'Pastel',
        description: 'Paste feito com massa caseira fresca,monte seu pastel com até 4 ingredientes recheado de ponta a ponta, aqui  é você quem manda, podendo escolher de 1 a 4 ingredientes.',
        price: 5.50,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 1,
        address_id: 1,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Cachorro Quente',
        description: 'Pão de hot dog 65 gramas, duas salsichas, ervilha, milho, purê,batata palha, ketchup, mostarda, barbecue, cheddar, Catupiry, queijo ralado. o melhor cachorro quente',
        price: 15.50,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 1,
        address_id: 1,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Corte de Cabelo Social',
        description: 'O corte de cabelo social confere um aspecto simples e limpo, sem fortes linhas e expressões. Muitos não aderem a esse estilo achando que ele só serve para cabelos curtos, mas isso não é verdade! Homens que têm o cabelo médio (e quando digo médio, não é até os ombros e sim um pouco maior) também tem possibilidades de aplicar este estilo.',
        price: 20,
        type: 'Serviço',
        whatsapp: null,
        link: null,
        user_id: 2,
        address_id: 2,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Corte de Cabelo Sulfista',
        description: 'Para as crianças ele era conhecido como “tigelinha”. Para os adultos ficou popular como “corte Justin Bieber”. Mas, o corte surfista ganhou uma repaginada e voltou com tudo. Corte para quem deseja manter um visual surfista, despojado e versátil, ele é perfeito para todo tipo de cabelo.',
        price: 15,
        type: 'Serviço',
        whatsapp: null,
        link: null,
        user_id: 2,
        address_id: 2,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Fazer a Barba',
        description: 'Um espaço exclusivamente masculino, para cuidar da barba, do cabelo e do bigode, inspirado no lifestyle de Los Angeles do passado.',
        price: 15,
        type: 'Serviço',
        whatsapp: null,
        link: null,
        user_id: 2,
        address_id: 2,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Gel de Cabelo',
        description: 'É um gel redutor de medidas que promove a quebra de gordura localizada, deixando a silhueta mais fina e com contorno mais bonito. ',
        price: 10,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 2,
        address_id: 2,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Chapinha',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
        price: 70,
        type: 'Serviço',
        whatsapp: null,
        link: null,
        user_id: 3,
        address_id: 3,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Fazer as unhas - manicure',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
        price: 30,
        type: 'Serviço',
        whatsapp: null,
        link: null,
        user_id: 3,
        address_id: 3,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Esmalte Rosa',
        description: 'Sinta toda a energia positiva do mundo com o Esmalte Risqué Rosas Cremoso Energia. Toda a linha de esmaltes cremosos Risqué Rosas , além de apresentar textura única e cores marcantes, acompanha as tendências da moda, possibilitando diversas composições de looks e maximizando a beleza da sua maquiagem e acessórios. Com secagem rápida, use a sua imaginação e crie lindas nails art que farão sucesso aonde quer que você vá. Com fórmula especial, livre de componentes que costumam causar alergias.',
        price: 4,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 3,
        address_id: 3,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'L’Oréal Professionnel Serie Expert Vitamino Color Resveratrol - Shampoo 1500ml',
        description: 'Shampoo diário para cabelos coloridos. Shampoo L’Oréal Professionnel Serie Expert Vitamino Color Resveratrol realiza uma limpeza delicada que não agride e mantém o brilho da cor. O primeiro passo para fios vibrantes, com o tom preservado.',
        price: 179.99,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 3,
        address_id: 3,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Geladinho',
        description: 'Venha comprar geladinho para esse calor, nós temos geladinho de coco, geladinho de chocolate, geladinho de morango etc...',
        price: 0.50,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 4,
        address_id: 4,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Bolo Caseiro',
        description: 'Venha compra bolos caseiros, temos bolo de fuba, bolo de milho, bolho de cenoura, bolo de chocolate entre outros.',
        price: 5,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 5,
        address_id: 5,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Cerveja Skol',
        description: 'Cerveja Pilsen Skol 350ml: Skol, a cerveja que desce redondo, é jovem e irreverente, com sabor e aroma leves, combinando bem com diversos petiscos! É a pedida ideal para festas, baladas, praia e para quando você quer refrescar os dias quentes do verão. ',
        price: 4.50,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 6,
        address_id: 6,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Refrigerante Coca-Cola Zero 2L',
        description: 'Refrigerante Zero Coca Cola 2L: Todo o sabor de Coca-Cola com zero calorias, ideal para acompanhar as refeições e se refrescar ao longo do dia. Aproveite os preços do Tenda Atacado!',
        price: 5.60,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 6,
        address_id: 6,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Cerveja Pilsen Itaipava 269ml',
        description: 'Cerveja Pilsen Itaipava 269ml: Cerveja leve, saborosa e refrescante, perfeita para o happy hour com os amigos. De baixa fermentação e amargor suave, combina muito bem com petiscos típicos de bar, como batata frita e frango a passarinho.',
        price: 4.30,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 7,
        address_id: 7,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Refrigerante Sabor Guaraná Dolly 2L',
        description: 'Refrigerante Sabor Guaraná Dolly 2L: Dolly é presença na mesa dos brasileiros desde 1987, é um refrigerante feito com o extrato natural da própria fruta, é ideal para ser servida bem gelada em ocasiões especiais, almoços, jantares, lanches e churrascos. ',
        price: 3.70,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 7,
        address_id: 7,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Pão de Queijo',
        description: 'Pão de queijo de otima qualidade, crocante e quentinho, feito na hora.',
        price: 0.20,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 8,
        address_id: 8,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Pão Frances',
        description: 'Pão Frances de otima qualidade, crocante e quentinho, feito na hora.',
        price: 0.25,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 8,
        address_id: 8,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Leite Integral 1L',
        description: 'Com baixo índice de gordura, o leite Líder é rico em vitaminas essenciais como o cálcio e as vitaminas A e D, sendo o alimento perfeito para começar o dia, podendo ser consumido quente ou frio',
        price: 3.50,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 8,
        address_id: 8,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Arroz Tipo 1 Solito 5kg',
        description: 'O arroz Solito é rico em carboidratos e vitaminas, o arroz é o alimento mais consumido no mundo. E há mais de 45 anos o Arroz Solito leva qualidade e sabor até você. Seu processo de beneficiamento passa por rigorosos controles de qualidade, com tecnologia de ponta e sem nenhum contato manual. Isso garante que só o melhor do arroz chegue até a sua mesa.',
        price: 20.15,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 9,
        address_id: 9,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Leite Longa Vida Integral Líder 1L',
        description: 'Leite Longa Vida Integral Líder 1L: Com baixo índice de gordura, o leite Líder é rico em vitaminas essenciais como o cálcio e as vitaminas A e D, sendo o alimento perfeito para começar o dia, podendo ser consumido quente ou frio',
        price: 3.75,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 9,
        address_id: 9,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Feijão Carioca Tipo 1 Camil 1kg',
        description: 'Feijão Carioca Tipo 1 Camil 1kg: Uma rica fonte de ferro e proteína vegetal, o feijão Camil tem uma textura macia e saborosa, levando menos tempo no cozimento. Um alimento indispensável para uma alimentação balanceada.',
        price: 6.90,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 9,
        address_id: 9,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Cerveja Skol Lata 350ml Com 12 Unidades',
        description: 'Skol lata 350 ml pacote com 12 unidades',
        price: 44.99,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 9,
        address_id: 9,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Picanha',
        description: 'Conhecida como carne nobre e muito apreciada nos churrascos, a picanha possui uma capa de gordura que garante o sabor e maciez da carne. Esta camada de gordura deve ser retirada somente no prato pois, se for retirada durante seu preparo, a peça pode perder seu sabor e suculência. Pesando em torno de 1,5kg, a peça é de fácil preparo e é própria para churrascos, mas pode ser preparada em assados, bifes ou carne de panela.',
        price: 157.60,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 11,
        address_id: 11,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Frango Orgânico Inteiro Congelado Un - Korin',
        description: 'O Frango Orgânico Inteiro Congelado não consome antibióticos, seja como promotor de tratamento, seja como terapêutico. além de serem alimentados com uma ração especial, feita pela própria Korin, a partir de grãos orgânicos certificados, sem nenhum ingrediente de origem animal. Também não são adicionados antibióticos a esta alimentação.',
        price: 39.90,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 11,
        address_id: 11,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Cimento Todas As Obras 50kg',
        description: 'O Cimento Todas as Obras 50kg da Votorantim é um Cimento  de alta qualidade, que atende aos requisitos técnicos das normas ABNT, sendo indicada para a preparação de diversos tipos de obras, reboco, concreto convencional, contra pisos e lajes.',
        price: 30.99,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 10,
        address_id: 10,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Areia 1 metro',
        description: '1 metro de area para construção.',
        price: 50,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 10,
        address_id: 10,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Impressão',
        description: 'Imprima seus trabalhos escolares, documento e boletos aqui, em preto e branco ou colorido.',
        price: 0.50,
        type: 'Serviço',
        whatsapp: null,
        link: null,
        user_id: 13,
        address_id: 13,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Xerox',
        description: 'Venha tirar xerox de seus documentos aqui',
        price: 0.25,
        type: 'Serviço',
        whatsapp: null,
        link: null,
        user_id: 13,
        address_id: 13,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Aspirina',
        description: 'A Aspirina é um remédio que contém como substância ativa o ácido acetilsalicílico, que é um anti-inflamatório não esteroide, que serve para tratar a inflamação, aliviar a dor e baixar a febre em adultos e crianças.',
        price: 5,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 12,
        address_id: 12,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      },

      {
        name: 'Xarope',
        description: 'Os xaropes usados para tratar a tosse devem ser adaptados ao tipo de tosse em questão, já que ela pode ser seca ou com catarro e o uso do xarope errado pode comprometer o tratamento.',
        price: 15,
        type: 'Produto',
        whatsapp: null,
        link: null,
        user_id: 12,
        address_id: 12,
        created_at: "2021-06-25 19:45:22",
        updated_at: "2021-06-25 19:45:22"
      }
      
    ], {}),

    down: (queryInterface) => queryInterface.bulkDelete('products', null, {}),
};

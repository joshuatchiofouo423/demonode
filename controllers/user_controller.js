const db = require('../models');
const {Sequelize } = require('../models'); // Assurez-vous que Sequelize est importé ici


exports.createdUser = async (req, res) => {
    try {
      const {nom, prenom , email, telephone } = req.body;
      console.log(req.body);
      
     
      const verifyIfUserExistWithEmail = await db.User.findOne({ where: {email} });
      const verifyIfUserExistWithTelephone = await db.User.findOne({ where: {telephone} });
      if(verifyIfUserExistWithTelephone){
        res.status(400).json("Ce numero est deja utilisé");
  
      }
      if(verifyIfUserExistWithEmail){
          res.status(400).json("Cet adresse email est deja utilisé");
      }
      const user = await db.User.create({ nom,prenom , email, telephone});
      console.log("user created:", user);
      
      res.status(201).json({user:user , message : 'Utilasateur cree'});
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' , error });
    }
  
}
exports.getAllUser = async (req , res) => {
    const AllUser = await db.User.findAll();
    res.status(200).json({user: AllUser , message: 'Uilisateur recuperer'})   
}
exports.getUser = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      
      return res.status(400).json({ message: 'Veuillez entrer un nom ou un prénom pour obtenir des suggestions.' });
    }

    const suggestions = await db.User.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nom: { [Sequelize.Op.like]: `%${query}%` } },
          { prenom: { [Sequelize.Op.like]: `%${query}%` } }
        ]
      }
    });
    if (suggestions.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }
    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Erreur lors de la récupération des suggestions:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des suggestions.' });
  }
};
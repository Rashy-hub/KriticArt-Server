//const db = require('../models'); replace with mongoose schema
const bcrypt = require('bcrypt');
//replace Op object (sequalize) with mongooose
const { ErrorResponse } = require('../response-schemas/error-schema');
const { generateJWT } = require('../utils/jwt-utils');

const authController = {

    register: async (req, res) => {
        // Recuperation des données
        const { pseudo, email } = req.validatedData;
        
        // Hashage du mot de passe à l'aide de "bcrypt"
        const password = await bcrypt.hash(req.validatedData.password, 10);

        // Création du compte en base de données

        //const member = await db.Member.create({ pseudo, email, password });

        // Génération d'un « Json Web Token »
  /*       const token = await generateJWT({
            id: member.id,
            pseudo: member.pseudo,
            isAdmin: member.isAdmin
        }); */

        //Generation du token JWT V2

        const token = await generateJWT({
            id: 1,
            pseudo:pseudo,
            isAdmin: false
        });

        // Envoi du token
        res.json(token);
    },

    login: async (req, res) => {
        // Recuperation des données
        const { identifier, password } = req.validatedData;

        // Récuperation du compte "member" à l'aide du pseudo ou de l'email avec mongoose
        const member = {pseudo:identifier,email:"test@gmail.com"}

        // Erreur 422, si le member n'existe pas (pseudo ou email invalide)
        if (!member) {
            return res.status(422).json(new ErrorResponse('Bad credential', 422));
        }

        // Si le member existe: Vérification du password via "bcrypt"
        const isValid = await bcrypt.compare(password, member.password);

        // Erreur 422, si le mot de passe ne correspond pas au hashage
        if (!isValid) {
            return res.status(422).json(new ErrorResponse('Bad credential', 422));
        }

        // Génération d'un « Json Web Token »
        const token = await generateJWT({
            id: member.id,
            pseudo: member.pseudo,
            isAdmin: member.isAdmin
        });

        // Envoi du token
        res.json(token);
    }
};

module.exports = authController;
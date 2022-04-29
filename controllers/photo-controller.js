const PhotoModel = require('../models/photo-model');
const { isValidObjectId } = require('mongoose');

const PhotoController = {
    get: async (req, res) => {

        let { limit, offset } = req.query;

        limit = limit ?? 5;
        offset = offset ?? 0;

        if (limit <= 0 || offset < 0) {
            res.sendStatus(400);
        }

        const result = await PhotoModel.find()
            .skip(offset)
            .limit(limit);
        res.json(result);
    },

    getById: async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        const result = await PhotoModel.findById(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.json(result);
    },

    insert: async (req, res) => {
        // verifier la validité de req.body et retourner un code 400 
        // si invalide (yup)

        const result = await PhotoModel.create(req.body);

        res.json(result);
    },

    update: async (req, res) => {
        // verifier la validité de req.body et retourner un code 400 
        // si invalide (yup)

        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        // { new: true } => result est modifié 
        const result = await PhotoModel
            .findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!result) {
            res.sendStatus(404);
            return;
        }

        res.json(result);
    },

    delete: async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }
        const result = await PhotoModel.findByIdAndDelete(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.json(result);
    }

};

module.exports = PhotoController;
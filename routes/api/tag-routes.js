const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
    Tag.findAll({
        include: [
            {
                model: Product
            }
        ]
    })
        .then(Data => res.json(Data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Product
            }
        ]
    })
        .then(Data => {
            if (!Data) {
                res.status(404).json({ error: 'no tag found' });
                return;
            }
            res.json(Data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name
    })
        .then(Data => res.json(Data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(Data => {
            if (!Data[0]) {
                res.status(404).json({ error: 'wrong id' });
                return;
            }
            res.json(Data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(Data => {
            if (!Data) {
                res.status(404).json({ error: 'Wrong id' });
                return;
            }
            res.json(Data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
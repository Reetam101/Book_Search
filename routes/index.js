const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    res.render('index');
})

router.post('/', async (req, res) => {
    try {
        d = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${req.body.title}+inauthor:${req.body.author}&key=${process.env.GOOGLE_API_KEY}`)
        data = await d.json()
        let arr = [];
        data.items.forEach((item) => {
            const { title, authors, publisher, description } = item.volumeInfo
            arr.push(item.volumeInfo);
        })
        res.render('index', {
            arr
        })
    } catch(err) {
        console.error(err)
    }
})

module.exports = router
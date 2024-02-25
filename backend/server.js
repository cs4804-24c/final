const express = require('express')
const fetch = require("node-fetch");
const app = express()
const port = 3000

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true, 
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.static('public'))

app.get('/forceapi/*', (req,res) => {
    console.log('https://stats.nba.com/stats'+req.url.substring(9))
    fetch('https://stats.nba.com/stats'+req.url.substring(9), {
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Origin': 'https://www.nba.com',
            'Referer': 'https://www.nba.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    })
    .then(data => data.json())
    .then(data => res.json(data))
})

app.get('/api/*', (req, res) => {
    console.log('https://stats.nba.com/stats'+req.url.substring(4))
    fetch('https://stats.nba.com/stats'+req.url.substring(4), {
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Origin': 'https://www.nba.com',
            'Referer': 'https://www.nba.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    }).catch( err => res.json({'Error': 'An error has occured - Fetch'}))
    .then( data => data.json().catch( err => ({'Error': 'An error has occured - JSON'})))
    .then(data => {
        let newData = {}
        data['resultSets'].forEach(e => {
            let headers = e['headers'];
            let newResult = []
            e['rowSet'].forEach(row => {
                let newDataObj = {}
                headers.forEach(heading => {
                    newDataObj[heading] = row[headers.indexOf(heading)]
                })
                newResult.push(newDataObj)
            })
            newData[e["name"]] = newResult
        });
        res.json(newData)
    }).catch( err => res.json({'Error': 'An error has occured - Remaking JSON'}))
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
const express = require('express');
const fs = require('fs');
const path = require('path');
const { PMTiles } = require('/pmtiles/js/dist/index'); // コンパイル後のエントリーポイントを指定

const app = express();
const port = 8080;

// PMTilesファイルのディレクトリ
const pmtilesPath = '/app/data';

app.get('/:file/:z/:x/:y', async (req, res) => {
    const { file, z, x, y } = req.params;
    try {
        const filePath = path.join(pmtilesPath, `${file}.pmtiles`);
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('PMTiles file not found');
        }

        const pmtiles = new PMTiles(filePath);
        const tile = await pmtiles.getTile(z, x, y);

        if (tile) {
            res.setHeader('Content-Type', 'image/png');
            res.send(tile);
        } else {
            res.status(404).send('Tile not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

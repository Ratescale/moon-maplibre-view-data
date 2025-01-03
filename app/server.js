const { PMTilesServer } = require('@protomaps/pmtiles');
const express = require('express');

const app = express();
const port = 8080;

// PMTilesファイルが保存されるディレクトリ
const pmtilesPath = '/app/data/';

app.get('/:file/:z/:x/:y', async (req, res) => {
    const { file, z, x, y } = req.params;
    try {
        const filePath = `${pmtilesPath}${file}.pmtiles`;
        const server = new PMTilesServer(filePath);
        const tile = await server.getTile(z, x, y);

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

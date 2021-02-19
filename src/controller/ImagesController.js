const fs = require('fs');
const request = require('request');
const path = require('path');
const axios = require('axios');

module.exports = {
    async download () {
        try{
            const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=898');
            console.log(__dirname)
            for(let i = 0; i < data.results.length; i++){
                const fileName = path.basename(`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${data.results[i].name}.png`);
                console.log(fileName)
                const localFilePath = path.resolve(__dirname, '../../images', fileName);
                const response = await axios({
                    method: "GET",
                    url: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${data.results[i].name}.png`,
                    responseType: "stream",
                  });
              
                  await response.data.pipe(fs.createWriteStream(localFilePath));
                  console.log("Successfully downloaded file!");
            }
        }catch(e){
            console.error(e);
        }
    }
}
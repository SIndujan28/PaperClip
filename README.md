# PaperClip
A NodeJs API that facilitates real-time search engine for an online bookstore capable of indexing thousands of book documents using elasticsearch.The metadata is ingested to Kafka using [golang CLI](https://github.com/SIndujan28/paperClip-cli) and automatically indexed to elasticsearch.

## Dependencies 
* Node.js (v12)
* Kafka v5.5
* Elasticsearch v7
* Docker,Docker Compose
* Express

## Local services setup
For local setup run ```bash docker-compose up ``` to start kafka broker,zookeeper and elasticsearch.

## Local deployment
* Install dependencies ```npm install ```
* Run lint ```npm run lint```
* Run lint fix ```npm run lint:fix```
* Initialize Elasticsearch,create and configured Elasticsearch index if not present: ```npm run init-es```, or re-create the index: ```npm run init-es force```
* Start the app ```npm start```
* App is running at ```http://localhost:3000```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

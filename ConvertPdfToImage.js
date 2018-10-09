const vision = require('@google-cloud/vision').v1;

const client = new vision.ImageAnnotatorClient();

const bucketName = 'myh999-bucket1';
const fileName = 'workout-sheet-converter/sample_images/Image1.pdf';
const gcsSourceUri = 'gs://myh999-bucket1/workout-sheet-converter/sample_images/Image1.pdf';
const gcsDestinationUri = 'gs://myh999-bucket1/workout-sheet-converter/sample_images/Image1.json';

const inputConfig = {
    mimeType: 'application/pdf',
    gcsSource: {
        uri: gcsSourceUri,
    },
};

const outputConfig = {
    gcsDestination: {
        uri: gcsDestinationUri,
    },
};

const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
const request = {
    requests: [
        {
            inputConfig: inputConfig,
            outputConfig: outputConfig,
            features: features,
        },
    ],
};

client.asyncBatchAnnotateFiles(request).then(results => {
    const operation = results[0];
    return operation.promise();
}).then(filesResponse => {
    const destinationUri = filesResponse[0].responses[0].outputConfig.gcsDestination.uri;
    console.log('Json saved to: ' + destinationUri);
}).catch(err => {
    console.error('ERROR: ', err);
});

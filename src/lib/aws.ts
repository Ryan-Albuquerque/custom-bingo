import AWS from "aws-sdk"; // certifique-se de instalar o aws-sdk com npm install aws-sdk
import getConfig from "next/config";

const config = getConfig();

// Configuração do S3
const s3 = new AWS.S3({
  accessKeyId: config?.serverRuntimeConfig.AWS_ACCESSKEY_ID, // Defina suas credenciais de acesso
  secretAccessKey: config?.serverRuntimeConfig.AWS_SECRETACCESS_KEY,
  region: config?.serverRuntimeConfig.AWS_REGION, // região do seu bucket
});

export default s3;

import { Injectable, Logger } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {

    private region : string;
    private s3 : S3Client;
    private logger = new Logger(S3Service.name);

    constructor(private  configService : ConfigService){
        this.region = this.configService.get<string>('BUCKET_REGION');
        this.s3 = new S3Client({
            region : this.region,
            credentials : {
                secretAccessKey : this.configService.get<string>('AWS_PRIVATE_KEY'),
                accessKeyId : this.configService.get<string>('AWS_PUBLIC_KEY')
            }
        })
    }

    async uploadFilesDontPromise(files: Express.Multer.File[], keys: string[]) {
        const bucket = this.configService.get<string>('BUCKET_NAME');
        const uploadUrls: string[] = [];
      
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const key = keys[i];
      
          const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: 'auto',
            ACL: '',
          };
      
          try {
            const imageRes: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input));
            if (imageRes.$metadata.httpStatusCode === 200) {
              const fileUrl = `https://${bucket}.s3.amazonaws.com/${key}`;
              uploadUrls.push(fileUrl);
            } else {
              throw new Error(`Failed to upload file ${key} to S3`);
            }
          } catch (error) {
            this.logger.error('No se almaceno el archivo en S3', error);
            throw error;
          }
        }
      
        return uploadUrls;
      }
      

    async uploadFiles(files: Express.Multer.File[], keys: string[]) {

        const bucket = this.configService.get<string>('BUCKET_NAME');
        const uploadPromises: Promise<string>[] = [];


        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const key = keys[i];

            let input: PutObjectCommandInput = {
                Body: file.buffer,
                Bucket: bucket,
                Key: key,
                ContentType: 'auto',
                ACL: '',
            }

            try {
        
                let imageRes : PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input));
                if(imageRes.$metadata.httpStatusCode === 200) {

                    const fileUrl = `https://${bucket}.s3.amazonaws.com/${key}`;
                    uploadPromises.push(Promise.resolve(fileUrl));
                 
                }
                else{
                    throw new Error(`Failed to upload file ${key} to S3`);
                }

                    
              } catch (error) {
                this.logger.error('No se almaceno el archivo en S3', error);
                throw error;
            } 
        }

        return Promise.all(uploadPromises);
    }

    async uploadFile(file: Express.Multer.File, key: string) {
        const bucket = this.configService.get<string>('BUCKET_NAME');
        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: 'auto',
            ACL: ''
        }

        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input)
            );

            if (response.$metadata.httpStatusCode === 200) {
                return `https://${bucket}.s3.amazonaws.com/${key}`;
            }

            throw new Error('La imagen no fue subida a  S3');

        } catch (error) {
            this.logger.error('No se almaceno el archivo en s3', error);
            throw error;
        }
    }

}


sam deploy \
  -t $STACK_TEMPLATE_FILE \
  --stack-name $STACK_NAME \
  --config-file ./samconfig.toml \
  --region $REGION

mkdir example_content
git clone https://github.com/cal-overflow/example-portfolio-content.git example_content
cp -r example_content/content/* src/content
cp -r example_content/assets/* src/assets

npm ci
npm run generate


sed '/<head>/r template/google-analytics-tag.html' dist/index.html > temp.html && mv temp.html dist/index.html

BUCKET=$(aws cloudformation describe-stacks --stack-name=$STACK_NAME --region $REGION --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)
aws s3 sync dist s3://$BUCKET


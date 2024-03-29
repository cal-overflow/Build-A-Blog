
sam deploy \
  -t $STACK_TEMPLATE_FILE \
  --stack-name $STACK_NAME \
  --config-file ./samconfig.toml \
  --region $REGION

mkdir example_site_repo
git clone https://github.com/cal-overflow/site.git example_site_repo
cp -r example_site_repo/src/content/* src/content
cp -r example_site_repo/src/assets/* src/assets
cp -r example_site_repo/src/static/* src/static

npm ci
npm run generate


BUCKET=$(aws cloudformation describe-stacks --stack-name=$STACK_NAME --region $REGION --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)
aws s3 sync dist s3://$BUCKET


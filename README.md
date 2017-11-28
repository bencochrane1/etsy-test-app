![Scheme](https://cdn.worldvectorlogo.com/logos/etsy.svg)

# Etsy Demo with Stripe

### Setup Instructions

- Clone project : `git clone git@github.com:bencochrane1/etsy-test-app.git`

- Make sure you have bower and stamplay-cli `npm install -g bower && stamplay-cli`

- Install the project dependencies : `bower install`

- Create a Stamplay account on stamplay.com

- Create the following tables:
#### Category
with fields: name (string)

#### Pictures
with fields: photo (file)

#### Products
with fields: 
category (points to category table item)
color (string)
description (string)
name (string)
pictures (points to pictures table item)
price (float)
size (array of strings)

#### Orders
with fields:
color (string)
price (float)
product (points to product table item)
size (string)


### Configure Stamplay Project : Run `stamplay login` and user your Stamplay login details


### Running locally for development

- Start development server : `stamplay start` & navigate to `localhost:8080` (if it doesn't take you there already)


### Deploying the project

- Run Stamplay CLI command : `stamplay deploy`


###############
# BUILD PHASE #
###############

FROM node:14 as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Run app
RUN npm run build


#############
# RUN PHASE #
#############

FROM nginx:alpine

# Copy /dist folder from build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

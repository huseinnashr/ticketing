# Ticketing Microservice

## What is this

This is course work by following Stephen Grider's [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/). See it live temporarily: [GitTix](http://www.huseinnashr.me/)

## What's this cover

Microservices with Event Bus Architecture - NATS Messaging - Load Balancing with Ingress NGINX - Common module between services with npm - Decentralized Authentication with JWT - Resource Versioning for concurrency issues - Redis Job queue wwith bull - Stripe, 3rd party payment service - Server Side Rendering with Next.js - Test Driven Development - CI/CD with Github Action - Deploy to Digital Ocean

## Whan to know more

### The bussiness process

The website which being developed here is a ticketing website where you can: signin/signup, list tickets, buy a ticket, checkout with stripe & see the list of orders. When you click purchase on a ticket page, the system will lock the ticket for 60 seconds and no one can buy it. You'll then redirected to order page with checkout powered by stripe payment. There you'll enter your card number and pay the ticket. A text will appear, showing the status of the order. On the other hand, if you fail to purchase the ticket within 60 seconds, then the system will unlock the ticket and your order will be cancelled. You can also see the order history on the My Orders page

### How to Run

1. Download & install [Docker Desktop](https://www.docker.com/products/docker-desktop) & [Skaffold](https://skaffold.dev/)
2. Run the [Kubernetes Server](https://collabnix.com/wp-content/uploads/2019/03/image-12-1024x704.png) on docker desktop
3. Restart your terminal
4. Install ingress-nginx to your kubernetes server by running the following command:
   - `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml`
5. Add [Stripe's API key](https://stripe.com/) as `STRIPE_KEY` to your environment variable
6. Add your stripe's api key & jwt key to kubectl secrets by running the following command:
   - `kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=INSERT_STRIPE_API_KEY`
   - `kubectl create secret generic jwt-secret --from-literal JWT_KEY=INSERT_RANDOM_STRING`
7. Add `127.0.0.1 ticketing.dev` line on the bottom of your system [hosts](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/) file
8. Run `Skaffold dev` on terminal in project's root directory
9. View the running site at `ticketing.dev`

---
created: 2023-05-13T12:19:34 (UTC +02:00)
tags: [architecture,oop,solid,typescript,software,coding,development,engineering,inclusive,community]
source: https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi
author: Dyarlen Iber
---

# Hexagonal Architecture and Clean Architecture (with examples) - DEV Community

> ## Excerpt
> Hexagonal Architecture and Clean Architecture   One of the things that changed my career as...

---
## [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#hexagonal-architecture-and-clean-architecture)Hexagonal Architecture and Clean Architecture

One of the things that changed my career as a software developer and changed my perspective on how to build software is the knowledge of how to architect my applications, and how to design my code in a more professional way, allowing my applications to scale.

> BTW, I'm creating a series of videos about Clean Architecture with Typescript, where I'll build a real-world API, exploring a bunch of cool features and concepts, and how to implement them using Clean Architecture.
> 
> If that sounds interesting, and you want to go beyond simple CRUDs with MVC, you can check out the [**Playlist on YouTube**](https://www.youtube.com/watch?v=bRl-sTvLbsI&list=PLN3ZW2QI7gLfQ4oEkDWw0DZVIjvAjO140&index=3&ab_channel=DyarlenIber), and the [**GitHub repository of this project**](https://github.com/dyarleniber/clean-architecture-with-typescript-api).
> 
> We will cover in the last session of this article some next steps and examples you can follow, but if you are looking for an example of how to apply Clean Architecture to a project with Typescript, [**you can take a look at this repository**](https://github.com/dyarleniber/simple-blog-application-backend-challenge).
> 
> Keep reading to understand the concepts better and why I believe the best way to understand Clean Architecture is to understand Hexagonal Architecture first :)

Normally when we start to develop software, especially when we use some framework, we tend to always use that well-known MVC pattern, dividing our application into models, views, and controllers.  
This is not that bad if you are building some simple, such as an MVP for example, however as we need to scale this application, add more features, replace a library, or something like that, we face several issues because as our code tends to get more coupled it becomes more and more difficult to make changes in our application without having to also change a lot of different places in our code.

With that our software becomes more susceptible to bugs and demotivates all the developers who need to maintain that code. And this is extremely common, mainly if you're just starting, we're not usually taught how to architect our application, we generally let some framework make the decision for us, and we end up putting all the business logic inside the controller for example.  
I remember doing this a lot when I was starting my career, and I remember being rejected in many interviews mostly for those companies that were looking for someone more senior or mid-level.

With that said, my main goal in this article is to give you a better understanding of how to architect your application, by separating the software into layers, and how to organize and isolate your business logic, so you will no longer squeeze everything inside the controller.

### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#hexagonal-architecture-ports-and-adapters-architecture)Hexagonal Architecture (Ports and Adapters Architecture)

Before diving into Clean Architecture, we will first take a brief look at Hexagonal Architecture (or Ports and Adapters Architecture, which I believe is a better name).

The Hexagonal Architecture (also known as Ports and Adapters Architecture) is a software architecture that is based on the idea of isolation of the core business logic from outside concerns by separating the application into loosely coupled components.

[![Hexagonal Architecture](https://res.cloudinary.com/practicaldev/image/fetch/s--8CyULLwt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cyfsq68u1mhy76ir9oq3.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--8CyULLwt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cyfsq68u1mhy76ir9oq3.png)

I took this image from this [Netflix blog post](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749).

Let's imagine that we are building an API that needs to fetch some data from a REST API.

Instead of having our use case class (or service class) tightly coupled to the external REST API, we can simply create a **Port**, which defines the interface that our use case class needs to implement to fetch the data (independently of how the data is fetched, using a REST API, a database, a GraphQL API, etc.). And then we can create n **Adapter**, which is a class that implements the **Port** interface and delegates the calls to the external REST API (or another external service).

This way, if we need to change the way we fetch the data, we only need to create a new **Adapter** that implements the **Port** interface, **without having to change the use case implementation**.

Before seeing some practical examples of how to create these **Ports** and **Adapters**, I want you to take a look at these two quotes from this [blog post](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749), which I believe summarize the main idea of the Hexagonal Architecture:

> “The idea of Hexagonal Architecture is to put inputs and outputs at the edges of our design. Business logic should not depend on whether we expose a REST or a GraphQL API, and it should not depend on where we get data from — a database, a microservice API exposed via gRPC or REST, or just a simple CSV file.”
> 
> “The pattern allows us to isolate the core logic of our application from outside concerns. Having our core logic isolated means we can easily change data source details without a significant impact or major code rewrites to the codebase.”

It's important to note that **Hexagonal Architecture came before Clean Architecture**, however, both share the same objective, which is the **separation of concerns**.  
In fact, the Hexagonal Architecture was one of the architectural patterns that Robert C. Martin (Uncle Bob - author of Clean Architecture) used as a reference to the Clean Architecture.

However, Hexagonal Architecture lacks some implementation details, that is where the Clean Architecture comes in, to fill in these "gaps".

#### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#typescript-example)Typescript example

Let's take a look at the Hexagonal Architecture in action using TypeScript.

One of the ways to create those **Ports** and **Adapters** is by using the **Dependency Inversion Principle**, the last SOLID principle (and this is kind of a spoiler for Clean Architecture).

The [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) states that:

> "High-level modules should not import anything from low-level modules. Both should depend on abstractions (e.g., interfaces)."
> 
> "Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions."

Let's suppose we want to create a use case class to export a user.

> If you are not familiar with the concept of use cases, don't worry, we will cover it in more detail in the Clean Architecture section.
> 
> But for now, just keep in mind that a use case class (or service class in the Domain-Driven Design terminology) is a class that is responsible for a specific user action (intention). Such as fetching an order, creating a product, updating a user, deleting an article, etc.  
> And usually, a controller class (responsible for handling the user requests) invokes the use case class to perform the user action.

And the most common way to do this is by having the use case class (or even the controller) tightly coupled to the export logic.

But instead of doing this, we can create an interface to abstract the export logic (**Port**):  

```
type User = {
    name: string,
    email: string,
    dateOfBirth: Date
};

// Port interface
interface ExportUser {
    export(user: User);
}
```

Enter fullscreen mode Exit fullscreen mode

And then create one (or more) implementations of this interface (**Adapter**):  

```
// CSV Adapter implementation
class ExportUserToCSV implements ExportUser {
    export(user) {
        // Export user to a CSV file
    }
}

// PDF Adapter implementation
class ExportUserToPDF implements ExportUser {
    export(user) {
        // Export user to a PDF file
    }
}
```

Enter fullscreen mode Exit fullscreen mode

Doing this, the implementation of the user export will depend on the interface (abstraction), as the Dependency Inversion Principle states.  
And the use case class will **not be dependent on any concrete implementation**:  

```
// Use case class
class ExportUserUseCase {
    constructor(private exportUser: ExportUser) {}

    execute(user: User) {
        this.exportUser.export(user);
    }
}
```

Enter fullscreen mode Exit fullscreen mode

Finally, we can switch between different implementations of the user export, without having to change the use case class implementation:  

```
// Export user to a CSV file
const exportUserToCSV = new ExportUserToCSV();
const exportUserUseCase = new ExportUserUseCase(exportUserToCSV);

exportUserUseCase.execute({
    name: 'John Doe',
    email: 'john.doe@mail.com',
    dateOfBirth: new Date()
});
```

Enter fullscreen mode Exit fullscreen mode

```
// Export user to a PDF file
const exportUserToPDF = new ExportUserToPDF();
const exportUserUseCase = new ExportUserUseCase(exportUserToPDF);

exportUserUseCase.execute({
    name: 'John Doe',
    email: 'john.doe@mail.com',
    dateOfBirth: new Date()
});
```

Enter fullscreen mode Exit fullscreen mode

### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#clean-architecture)Clean Architecture

Now, after having a look at Hexagonal Architecture, we can start to get a better look at what Clean Architecture is about.

Hexagonal Architecture and many other architectural patterns share the same goal: the separation of concerns. And they all achieve this goal by dividing the application into layers.  
And the [Clean Architecture is just an attempt at integrating all these architectures into a single idea](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

It's important to mention that the Clean Architecture is **NOT** just a folder structure that you can copy and paste to your project.  
It's the idea of separating the application into layers, and conforming to **The Dependency Rule**, creating a system that is:

-   Independent of Frameworks
-   Testable
-   Independent of UI
-   Independent of Database
-   Independent of any external agency

To start, let's go through the layers of the Clean Architecture:

[![Clean Architecture](https://res.cloudinary.com/practicaldev/image/fetch/s--eGHFHV7r--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6y5o7fw1m47tvp7eodzk.jpeg)](https://res.cloudinary.com/practicaldev/image/fetch/s--eGHFHV7r--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6y5o7fw1m47tvp7eodzk.jpeg)

#### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#entities-domain-layer)Entities (Domain Layer)

This Layer is responsible for the business logic of the application.  
It's the most stable layer, and it's basically the **heart** of the application.

Here is where we can apply some **Domain-Driven Design** tactics, such as Aggregates, Value Objects, Entities, Domain Services, etc.  
By the way, the title of the book that introduced the concept of Domain-Driven Design in 2004, is [**"Domain-Driven Design: Tackling Complexity in the Heart of Software"**](https://www.amazon.com/gp/product/B00794TAUG), by Eric Evans.

This layer is isolated from the rest of the application (outer layers concerns).

#### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#use-cases-application-layer)Use Cases (Application Layer)

This layer contains the application specific business rules. It implements all the use cases of the application, it uses the domain classes, but it is isolated from the details and implementation of outer layers, such as databases, adapters, etc.  
This layer just holds interfaces to interact with the outside world.

As we have seen before, use cases are the user actions, or the user intentions, like fetching an order, creating a product, and so on.  
And each use case must be independent of the other use cases, to be compliant with the Single Responsibility Principle (the first SOLID principle).

Example:  

```
import { GetPostByIdUseCase } from '@application/interfaces/use-cases/posts/GetPostByIdUseCase';
import { GetPostByIdRepository } from '@application/interfaces/repositories/posts/GetPostByIdRepository';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

export class GetPostById implements GetPostByIdUseCase {
    constructor(
        private readonly getPostByIdRepository: GetPostByIdRepository,
    ) {}

    async execute(postId: GetPostByIdUseCase.Input): Promise<GetPostByIdUseCase.Output> {
        const post = await this.getPostByIdRepository.getPostById(postId);
        if (!post) {
            return new PostNotFoundError();
        }
        return post;
    }
}
```

Enter fullscreen mode Exit fullscreen mode

In this example, we have an interface (`GetPostByIdUseCase`) that contains the `Input` and `Output` of the use case, which are the DTOs (Data Transfer Objects), that are used together with other interfaces (like the `GetPostByIdRepository` interface) to interact with the outside world.

Note that this use case is only responsible for fetching a post by its ID, in case we need to delete a post, we need to create another use case.  
It's very common when working with MVC pattern for example, to have a gigantic controller class that handles all the user requests. However, it hurts the Single Responsibility Principle.

#### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#interface-adapters-infrastructure-layer)Interface Adapters (Infrastructure Layer)

The Infrastructure layer is the layer that contains all the concrete implementations of the application, like the repositories, the adapters, the database connections, etc.

#### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#frameworks-amp-drivers)Frameworks & Drivers

This layer is composed of frameworks and tools such as the Database, the Web Framework, etc.  
Usually, we don’t write much code in this layer.

#### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#only-four-layers)Only Four layers?

There’s no rule that says you must always have just these four layers. However, **The Dependency Rule** always applies.

#### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#the-dependency-rule)The Dependency Rule

[The Dependency Rule states that](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html):

> "Source code dependencies can only point inwards."
> 
> "Nothing in an inner circle can know anything at all about something in an outer circle."

Basically, the name of something declared in an outer circle must **NOT** be mentioned by the code in an inner circle. That includes, functions, classes. variables, or any other named software entity.  
**We don’t want anything in an outer circle to impact the inner circles.**

For example, in the domain layer, we must **NOT** mention anything within the application layer, or within the infrastructure layer. The same goes for the application layer, we must **NOT** mention anything within the infrastructure layer, and so on.

But obviously, we can use the entities defined within the domain layer within the application layer for example.

### [](https://dev.to/dyarleniber/hexagonal-architecture-and-clean-architecture-with-examples-48oi#final-thoughts-and-next-steps)Final thoughts and next steps

Clean Architecture is a great architectural pattern to follow if you want to design a large-scale application (and go beyond the simple CRUDs with the MVC pattern).  
It will help you to write a clean, flexible, testable, and maintainable code, by separating the application into layers.

In addition, if you want to get even better at organizing your business logic, and modeling the domain of your application, you can also take advantage of the **Domain-Driven Design**. Clean Architecture when combined with Domain-Driven Design is a really powerful tool!

If you want to learn more about Clean Architecture, you can also check out the [Clean Architecture book](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164), or the [Clean Architecture blog post](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).  
A fun fact is that everything you need to know about Clean Architecture is already in this blog post, all the pages that mention Clean Architecture in the book are also in the blog post.  
Of course, if you have the opportunity to read the book, I highly recommend it, but it's important to know that all the concepts are already explained in this blog post.

And if you want to take a look in a code example, of how to use Clean Architecture in a project, you can also check out this repository: [**Simple Blog Application: backend challenge**](https://github.com/dyarleniber/simple-blog-application-backend-challenge).  
Where I created a Simple Blog API built with TypeScript and MongoDB, using TDD, Clean Architecture, SOLID principles, Design Patterns, and some DDD patterns.  
It was part of a backend coding challenge, so it has some other interesting features, like authentication with JWT, a CI Workflow with GitHub Actions, a local environment with Docker and Docker Compose, and a documentation.

It's a good example to understand how to use Clean Architecture, but remember that Clean Architecture is not about the folder structure, you can use it as a reference, but each project will have its own specific implementation needs.  
In this project, I created a directory for each layer inside the `src` folder. Besides the domain layer, the application layer, and the infrastructure layer, I created an additional layer for acting as an entry point for the application, it is the layer that contains the Express server, and where all the routes are defined. In this layer I also compose all the controllers, middlewares, and use cases, injecting the dependencies that are needed, since I am not using any dependency injection container.  
But you can get more information in the `README.md` file of the project.

Last but not least, I'm creating a series of videos about Clean Architecture with Typescript, where I'll build a real-world API, exploring a bunch of cool features and concepts, and how to implement them using Clean Architecture.  
These are some topics we are going to see:

-   OOP with Typescript
-   Clean Architecture
-   SOLID Principles
-   Design Patterns
-   DDD Patterns
-   REST / GraphQL
-   Git
    -   Conventional Commits
-   JWT authentication
-   Roles and Permissions
-   Integrations
    -   Google APIs
    -   AWS
    -   Email services
-   Advanced MongoDB
    -   MongoDB Indexes
    -   MongoDB Schemas
    -   MongoDB Transactions
    -   Migrations
-   Docker and Docker Compose
-   TDD using Jest
    -   Unit
    -   Integration
    -   E2E
-   CI Workflow using GitHub Actions
-   API Documentation using Swagger
-   Deployment

And more!

If that sounds interesting, and you want to go beyond simple CRUDs with MVC, you can check out the [**Playlist on YouTube**](https://www.youtube.com/watch?v=bRl-sTvLbsI&list=PLN3ZW2QI7gLfQ4oEkDWw0DZVIjvAjO140&index=3&ab_channel=DyarlenIber), and the [**GitHub repository of this project**](https://github.com/dyarleniber/clean-architecture-with-typescript-api).

Thank you!

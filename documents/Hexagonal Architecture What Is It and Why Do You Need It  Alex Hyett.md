# Hexagonal Architecture: What Is It and Why Do You Need It?

[Source](https://www.alexhyett.com/hexagonal-architecture/)

We all do our best to try and write clean code that is going to be easy to maintain in the future. As time goes on and the application gets bigger with more features being added and technologies being changed you end up with a spaghetti mess of code.

This is where the concept of software architecture comes in. We want to build something that is going to stand the test of time like a great cathedral no matter how many feature requests are thrown at it.

<iframe src="https://www.youtube-nocookie.com/embed/bDWApqAUjEI?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>

[Subscribe for more video content](https://youtube.com/channel/UCm6lURZOeBVCZ5hJpqlUB-g?sub_confirmation=1)

## [](https://www.alexhyett.com/hexagonal-architecture/#traditional-architecture)Traditional Architecture

The traditional way of architecting an application uses what we call 3-tier architecture.

Your application is split into three layers.

![Three Tier Architecture](https://res.cloudinary.com/dlgglwrvf/image/upload/v1676466833/3_Tier_bb9df62644.jpg)

### [](https://www.alexhyett.com/hexagonal-architecture/#presentation-layer)Presentation Layer

The first is the presentation layer. This is the layer that your users interact with. This could be the front end of your application or in some cases the API contract that you expose two your users.

### [](https://www.alexhyett.com/hexagonal-architecture/#logic-layer)Logic Layer

The second layer is the logic layer. As the name suggests this is the core part of your application where all the logic of your system is held.

### [](https://www.alexhyett.com/hexagonal-architecture/#data-layer)Data Layer

Lastly, we have the data layer that controls how data is persisted in your application.

This is generally a good start when trying to architect an application. However, this layered approach doesn’t say much about how these layers interact.

If you are not careful it is extremely easy to make each layer highly coupled to each other.

We generally try and use things like dependency injection and relying on abstract contracts to prevent too much coupling but the hexagonal architecture takes this a step further.

## [](https://www.alexhyett.com/hexagonal-architecture/#ports-and-adapters)Ports and Adapters

As with all things in software development and the English language in general we have multiple names for the same thing.

![Hexagonal Architecture](https://res.cloudinary.com/dlgglwrvf/image/upload/v1676466597/hexagonal_archictecture_bdd08b5d04.jpg)

If you haven’t heard of hexagonal architecture then you may have heard of the ports and adapters pattern.

Alister Cockburn, who came up with the idea for hexagonal architecture realised that there really wasn’t much difference between interacting with a database compared to other external applications.

In the same way that we might use an interface and repository to interact with a database. We can use ports and adapters for all of our inputs and outputs to our application.

At the heart, we have the core logic of our application. The goal here is to create abstractions between the inputs and outputs of the application.

### [](https://www.alexhyett.com/hexagonal-architecture/#ports)Ports

For each input and output to the application, we have a port. This is simply an abstraction.

Say we want to read and write from a database, instead of calling the database in our application, we might have a generic read and save method that gets called.

The application doesn’t care whether we are saving to a database, a file system or an event-based queue. All it needs to know is that there is a way to read and write data.

### [](https://www.alexhyett.com/hexagonal-architecture/#adapters)Adapters

All the code for actually communicating with the database happens inside the adapter.

This way the application does not need to understand anything about the underlying technologies being used all this is done inside the adapter.

If you have ever written a repository for a database then you will probably be familiar with the concept.

### [](https://www.alexhyett.com/hexagonal-architecture/#driving-primary-vs-driven-secondary)Driving (Primary) vs Driven (Secondary)

It is not just the outputs of our application that can use this pattern we can also do the same with the inputs.

There can be lots of different ways that we interact with our application. We could be using an API or message queue for example.

In each case, the application should have no knowledge of the technology being used to interact with it.

So we have two sides to our application which Alister describes as the Driving side and the Driven side.

The input is driving our application to do something and the outputs are driven by the application itself.

The hexagon is just a shape to help visualise the architecture and doesn’t really have any real-world reasoning behind it.

Except, what do you think of when you see a hexagon?

For me, I think of a honeycomb with lots of hexagons connected together.

Your application can have multiple inputs and ports and one of those might be an API. When we save data we generally think of saving it to a database or a filesystem.

However, if you have ever worked with cloud platforms such as AWS, you will know that when you save to DynamoDB, you will be using an AWS API.

So if the inputs of your application are an API and your output might also be calling an API then you can start to imagine how each of these applications might link together like a big honeycomb.

If you have a particularly large application you can start splitting it up into different domains. This is the concept behind domain-driven design where each application is only responsible for one domain.

One domain might be user management, another might be search or data persistence.

Each of these parts of your application could become its own hexagon.

## [](https://www.alexhyett.com/hexagonal-architecture/#pros-and-cons-of-hexagonal-architecture)Pros and Cons of Hexagonal Architecture

Hexagonal architecture is great but there are a few pros and cons that you need to consider before you go ahead and implement it in your applications.

### [](https://www.alexhyett.com/hexagonal-architecture/#pros)Pros

**Testability** If you have ever tried writing unit tests for application after it has already been written without testing in mind you will know how much of a pain it is. When a component is tightly coupled to others it can be impossible to test in isolation.

With hexagonal architecture, this isn’t going to be an issue as everything is using abstractions by design.

**Maintainability** As your application is completely decoupled from the technologies that you are using it becomes a lot easier to maintain. If you need to switch out the database for a different one you only need to change the adapter being used and not the application itself.

**Flexibility** As with maintainability, it gives you a lot more flexibility with how your application is structured.

If you wanted to add in some additional data processing before data is saved you can do this in the adapter or even connect it to another hexagon to do the processing.

### [](https://www.alexhyett.com/hexagonal-architecture/#cons)Cons

**Complexity in code** The hexagonal architecture does mean you are going to need to write more code in order to decouple everything. Instead of having your code call the database directly you now need a port and adapter.

**Complex when running locally** Depending on how far you take this approach if you end up with multiple components running in isolation you may need to do a bit more work when running your application locally.

Anyone who has worked on a micro-service architecture will know the pain of having to spin up 20 docker containers to run the application on your machine.

**Performance considerations** Lastly, there are potential performance issues if you take this pattern to the extreme. If all communication is happening over API you might introduce additional latency to your application which could become a problem when your application needs to scale.

## [](https://www.alexhyett.com/hexagonal-architecture/#when-to-use-hexagonal-architecture)When to use Hexagonal Architecture?

Hopefully, now you can see the potential for hexagonal architecture and how you can use it in your applications.

But before you rush off and split your application into 20 different hexagons, should you use it?

Hexagonal architecture is great for large applications that have a lot of different inputs and outputs but if you are working on a small application it is probably not worth adding in all the additional complexity.

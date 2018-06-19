# node-chat

WIP

## Motivation
Let's build a chat backend system! I've always been passionate about complex backend systems and distributed services and so this provides the perfect excuse to build such a system and refresh my devops skills along the way.

Goals:

- NodeJS API.
- Server-client connection with websockets.
- Message queuing and distribution with rabbitMQ.
- Containarize with docker and store it in ECS.
- Serve it with EC2, begind an ALB with auto-scaling.

### Current status
Currently the API broadcasts to every node connected to it but the basic building blocks in which I was more interested in are already built.

I followed design principles detailed in [this article](https://smartym.pro/blog/mobile-messaging-app-development-developing-architecture-for-a-chat-application/).

Basically, there's two permanent queues along which all messages flow through. This allows the system to not block IO and perform slower tasks (e.g: user authentication, permission checking, database querying, etc...) between queues.
Eventually, both queues and the worker could be separated in independent servers and the worker escalated horizontally.

Then there's N temporary queues for N users connected, all managed through a `UserExchange`. These temporary queues are dropped as soon as the user disconnects. As I've said, right now all messages are broadcasted
to all temporary queues but it would be easy to setup a temporary register of users with unique identifiers, correlate temporary queues with such identifiers and then send private messages between a subset of N known users.

Image of a message "traveling" through the system:
![](https://smartym.pro/wp-content/uploads/2017/12/rabbitmq-2.png)

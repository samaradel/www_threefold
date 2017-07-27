+++
# Don't remove title!
title = "blog"
header = "Autonomous"
image = "../img/autonomous.jpg"
author = "Weynand Kuijpers"
subtitle = "Yes, a 100% self-healing cloud"
weight = 3
+++

## The zero-OS future: a 100% self healing cloud

Why do we set such an ambitious goal? Because it’s a crucial component of a truly secure computing environment.

GIG is working to deliver a system capable of running of any number of computation and network nodes in an autonomous way, without manual intervention. We have stateless computing nodes. This means that there are no local configuration files, nor anything unencrypted to access or tamper with. If the node loses power and it reboots, there is nothing left to access - encryption keys are never stored locally. Only when an autonomous service holding the encryption keys reconnects the node to a state, is the node able to resume operations.

In order to provide a secure communication channel to allow such reconnection, we need the blockchain: the autonomous agents governing all the nodes, run on the blockchain being managed by all of the nodes. The blockchain furthermore enables a highly distributed log server keeping track of all agent’s actions. It establishes a secure communication channel between them and allows the agents to manage the states of the nodes. It does so in a way that requires neither supervision nor manual intervention.

In fact, manual intervention is even rendered explicitly impossible: Secure computing environments are requested from the autonomous agents, who spin up a secure container in a random location somewhere in the grid. The location randomness acts as an extra barrier against targeted network attacks or physical intrusion.

In effect, this renders the autonomous services akin to virtual IT managers, or a group of managing agents living and communicating on the blockchain. The blockchain also serves as a log server keeping track of all agent’s actions. This allows proper auditing and enables automated billing. In addition, as the agents are not bound to a single centralized machine, the whole system can become resilient to spot outages.

In conclusion:

> **Secure computing requires autonomous decentralized management**
>
> **Autonomous decentralized management still needs accountability**
>
> **Accountability in a decentralized setting leads us to the blockchain**

Each of the parts of this story will be a blogpost of its own.


Photo by Jakob Owens on Unsplash

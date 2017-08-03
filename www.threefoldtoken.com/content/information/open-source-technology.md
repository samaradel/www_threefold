+++
# Don't remove name!
title = "information"
header = "Open Source Technology"
image = "../img/use-cases-edge.jpg"
author = "Andreas Hartl"
subtitle = "Overview of our technology components and links to repositories"
weight = 6

+++

### Open Source Components Overview
 
The following components are used to build our grid and deliver us unequivalent benefits in power optimization, performance & scale.
 
- [Jumpscale  = Automation Framework](https://github.com/Jumpscale)
- [Distributed OS = Zero-OS](https://github.com/zero-os)
- [Neutral identity management](https://github.com/itsyouonline) 
- [More Scalable Blockchain](https://github.com/rivine)
 
### Open Source Architecture Components
 
#### Zero-OS
 
True Distributed OS
Managed By Our Zero-OS Controller
 
It is a very different type of OS
 
- no more local filesystems
- no more a volume driver
- no more local packages, software installations..
- no terminal (like ssh, ...)
 
Zero OS Components
 
- 0-OS Orchestrator (controls all the nodes running Zero-OS in a resource pool)
- 0-OS core (replacement of systemd, kernel boots this first process)
- 0-OS filesystem (virtual filesystem for Zero-OS, OS files are not installed on local storage)
- 0-OS vDisk (virtual Disks running 0-OS FS)
- 0-OS cockpit (AYS - selfhealing, jumpscale portal, restAPI, Telegram interface)
- 0-OS CLI - command line tools

see https://github.com/zero-os
 
 
#### Zero Storage (part of Zero-OS)
 
- Easy to use
- 1 IT person can manage 100 Petabyte
- Dense & Green
- 5PB in 1 rack for archive, 
- using conventional disks for storage 
- Super scale out 50+ PB
- Multi datacenter with single namespace
- Not based on replication!
- Can loose datacenters, data remains available
- Ultra high performance 100-250.000 IOPS per node (depends on HW)
- Ultra reliable
- Replication & backup obsolete
- Space efficient 2-3x better than alternatives (NAS & Archive)
- Self-healing

 see https://github.com/zero-os
 
#### Cockpit (= Jumpscale / At Your Service)
 
- Enables anyone to design and deploy virtual datacenters in minutes
- Open source, free of charge software
- Comprehensive: human readable, easy to learn format
- No more complicated technical oriented configuration files
- No networking, virtualization or storage expertise required
- Concentrate on business process automation, not IT
- Runs on any Zero-OS, eliminating layers of complexity
- With ready-to-deploy blueprints available off-the-shelf
- Blueprint marketplaces can develop and deploy
- Manage full IT lifecycles leveraging container technology
- Grow, ad, distribute, destroy capacity as needed.
- No downtime: Change and upgrades are immediate
- Design Intelligence: Robots and algorithms assist you.
 
 
#### ItsYou.Online
 
Need a neutral identity management system?
No hacking or compromising: e.g. Blockchain proof-of-work
 	
features:
 

- Peer-to-Peer Distributed
- Blockchain Protected
- .. to be completed


https://github.com/itsyouonline
 
 
#### Rivine
 
Blockchain toolkit
 
- Green and Secure
- No mining but Proof of BlockStake
- Scalable
  - Off chain micropayments
  - Application specific chain support
- Smart contracts
- Custom transaction validity rules
- Notary
  - Register and time the existence of 
contracts/documents/...
- Secure lightweight (mobile) client support
- Authorized addresses support
  - Compliance with KYC and AML 
- Deterministic wallets:
  - Allows for offline master keys


  see https://github.com/rivine



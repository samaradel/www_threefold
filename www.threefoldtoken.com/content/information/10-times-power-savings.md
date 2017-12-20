+++

#Don't remove name!
title = "10x times power savings, is this possible?"
image = "../img/10x-times-power.jpg"
author = "Andreas Hartl"
subtitle = "10x times power savings, is this possible?"
weight = 8

+++

### How do we achieve the efficient power usage in our Zero-OS node

Today global Internet infrastructure requires enormous amounts of energy - well north of the entire annual electricity consumption of the United Kingdom - ranking among the more pollutive industries globally (similar to airlines!)

We believe IT can do a lot better - in fact we believe we can reduce the Internet’s carbon footprint by 10 times compared to other industry standard IT capacity producing solutions.

Power consumption is a function of better compute and storage performance requiring more racks and more cooling.

Our solutions achieve roughly 3 times the performance per rack (so we use fewer racks) - and our racks require less energy than typical racks in the industry :-) for storage upto 10x benefit can be achieved.


### Less = More


#### Eliminate layers of complexity - Keep it Simple.

Over time integration suites, middleware solutions, enterprise service buses have been invented and implemented to cover integration challenges. This has overly complicated IT architectures and is resulting in loss of actual end user workload performance. By eliminating layers of complexity the resulting cloud stack presents minimal overhead and therefore requires less hardware - resulting in lower heat generation requiring less cooling facility. By producing less power the net results is a factor of 2 to 5 of total energy consumption decrease

#### Self Healing

Keeping things up and running is a business model in modern day IT.  Major vendors earn most of their margin by selling maintenance contracts, performance guarantees and professional services. Therefore there is no incentive to make things simple and effective. Creating a self healing environment requires minimal manual intervention to replace broken hardware components. Broken hardware components are inevitable and the 0-OS distributed node architecture deals with hardware failures by turning off broken components and provisions unused capacity. Not shipping broken parts back and forth with the corresponding installation knowledge (=engineers) means a much smaller carbon emission footprint.

#### “No painkiller” approach

Do not cut corners. If a specific piece of software or hardware is not delivering the required  performance or reliability look at the core design / algorithm and its usage of soft / hard components. Do not follow the path of least resistance and start swapping components for faster ones - look for the root cause and innovate on that. This has been used a lot by storage vendors to improve on performance - if performance is not met letś use a faster component (CPU, Memory, Network card, proprietary acceleration). This eliminates the need to actually look at the core algorithms and innovate on it but make you rely on other companies innovation to achieve higher performance.

By using these three principles the  Zero-OS node has got a minimal footprint in terms of power consumption. Some key examples how this is achieved:

#### Minimise the number of context switches

Virtualization add layers of software between the actual end-user workload and physical hardware, but is also allow for multiple workloads to run on the same hardware using excess capacity.  So there is definitely merit in building a virtualization solution. Building an effective virtualization solution that does not require abundant context switching is key and therefore 0-OS has been developed.  0-OS uses a minimal linux kernel that allows for a number of user spaces to co-exist. In these user space containerised version of software can run taking away the needs to have a hypervisor and virtual OS fueling virtual machines. This minimises the required overhead for the host OS and takes away for a large part the need for a hypervisor and guest OS’s

#### Minimise the use of network connections

Supercomputing delivered the world a large number of new technologies, not all of them presenting very usable solutions for everyday workloads. But one technology invented to make supercomputer as powerful (=fast) as possible is the use of Remote Direct Memory Access (RDMA).  RDMA allowed physical CPU boards (containing both CPU’s and Memory) to access over a dedicated channel other CPU boards in memory stored data. This eliminated the needs to transport data between CPU nodes over for network connections (or other mainstream means to exchange data).  The result of this is that a lot less overhead was created to allow for distributed end user workloads to operate over multiple physical cores. The leading brands of server and storage solution have never considered nor implemented this mechanisms increasing the need for faster and faster networks - increasing complexity, cost, effort and resources needed to operate the solution.

By using a different, more efficient means to exchange data between physical CPU units does no longer requires forests of switching gear.

#### Minimise the use of number of disks

Our storage solution uses slow and big - the bigger the better - HDD disks which drive in rack density and as they spin slower they consume less power and need less cooling. But you might say how can you deal with read/write intensive workloads? Our storage algorithm uses a SSD cache to acknowledge I/O coming from the application, fills the erasure coded data blocks in large up to 64MB storage containers and writes these big chunks of data on the big and slow HHDs. If you are familiar with what HDD disks you know they like to be streamed on instead of a ton of small bits in scratchy way.

Continuous innovation in all of these areas have lead to a very efficient technology stack

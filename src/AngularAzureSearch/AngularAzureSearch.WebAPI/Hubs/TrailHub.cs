using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using AngularAzureSearch.WebAPI.Entities;

namespace AngularAzureSearch.WebAPI.Hubs
{
    [HubName("trailHub")]
    public class TrailHub : Hub
    {
    }
}
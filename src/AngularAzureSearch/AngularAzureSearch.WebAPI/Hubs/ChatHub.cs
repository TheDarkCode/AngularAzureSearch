using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AngularAzureSearch.WebAPI.Hubs
{
    [HubName("chatHub")]
    public class ChatHub : Hub
    {
    }
}

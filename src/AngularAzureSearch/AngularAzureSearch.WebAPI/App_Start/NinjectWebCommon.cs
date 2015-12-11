[assembly: WebActivator.PreApplicationStartMethod(typeof(AngularAzureSearch.WebAPI.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivator.ApplicationShutdownMethodAttribute(typeof(AngularAzureSearch.WebAPI.App_Start.NinjectWebCommon), "Stop")]

namespace AngularAzureSearch.WebAPI.App_Start
{
    using System;
    using System.Web;

    using AngularAzureSearch.WebAPI.Repositories;
    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using Services;
    using PartitionRepositories;
    using Ninject.Activation;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

            RegisterServices(kernel);

            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new Ninject.WebApi.DependencyResolver.NinjectDependencyResolver(kernel);

            return kernel;
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            // Template where **** equals the naming convention you used.
            //kernel.Bind<I****Repository>().To<****Repository>();
            kernel.Bind<IMailService>().To<MailService>().InRequestScope();

            // For injecting service for interacting with Blob Storage. Not used yet.
            //kernel.Bind<IBlobService>().To<BlobService>();

            kernel.Bind<ITrailRepository>().To<TrailRepository>();
            kernel.Bind<IItemRepository>().To<ItemRepository>().WithConstructorArgument("resolverService", "1"); // Managed Hash Partitioning
            
            // Example of passing tenantId in via httpContext.Session property. TO DO:: create property in session.
            // kernel.Bind<IItemRepository>().To<ItemRepository>().WithConstructorArgument("tenantId", GetTenantIdFromSession);
        }

        //private static object GetTenantIdFromSession(IContext context)
        //{
        //    var httpContext = context.Kernel.Get<HttpContextBase>();
        //    if (httpContext != null && httpContext.Session != null)
        //    {
        //        var arg = httpContext.Session["tenantId"];
        //        if (arg != null && !string.IsNullOrEmpty(arg.ToString()))
        //        {
        //            return arg;
        //        }
        //    }
        //    return null;
        //}
    }
}

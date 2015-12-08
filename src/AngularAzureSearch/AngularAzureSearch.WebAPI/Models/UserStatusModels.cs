using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularAzureSearch.WebAPI.Models
{
    /// <summary>
    /// Represents the status of a user.
    /// </summary>
    public enum UserStatus
    {
        /// <summary>
        /// The user is available.
        /// </summary>
        Available,

        /// <summary>
        /// The user is busy.
        /// </summary>
        Busy,

        /// <summary>
        /// The user has marked their status as "Do Not Disturb".
        /// </summary>
        DoNotDisturb,

        /// <summary>
        /// The user has marked their status as "Be Right Back".
        /// </summary>
        BeRightBack,

        /// <summary>
        /// The user has marked their status as "Off Work".
        /// </summary>
        OffWork,

        /// <summary>
        /// The user has marked their status as "Appear Away".
        /// </summary>
        AppearAway
    }
}

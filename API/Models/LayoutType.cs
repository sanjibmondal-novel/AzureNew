using System;

namespace AzureNew.Models
{
    /// <summary> 
    /// Represents different layout type.
    /// </summary>

    public enum LayoutType
    {
        /// <summary> 
        /// Allows list layout.
        /// </summary>

        List = 1,
        /// <summary> 
        /// Allows add layout.
        /// </summary>

        Add = 2,
        /// <summary> 
        /// Allows  edit layout.
        /// </summary>

        Edit = 3
    }
}
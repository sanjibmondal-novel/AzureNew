using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AzureNew.Entities
{
    /// <summary> 
    /// Represents a tenant entity with essential details
    /// </summary>
    public class Tenant
    {
        /// <summary>
        /// Primary key for the Tenant 
        /// </summary>
        [Key]
        [Required]
        public Guid Id { get; set; }

        /// <summary>
        /// Required field Code of the Tenant 
        /// </summary>
        [Required]
        public string Code { get; set; }
        /// <summary>
        /// Name of the Tenant 
        /// </summary>
        public string? Name { get; set; }
        /// <summary>
        /// Address1 of the Tenant 
        /// </summary>
        public string? Address1 { get; set; }
        /// <summary>
        /// Address2 of the Tenant 
        /// </summary>
        public string? Address2 { get; set; }
        /// <summary>
        /// City of the Tenant 
        /// </summary>
        public string? City { get; set; }
        /// <summary>
        /// Pincode of the Tenant 
        /// </summary>
        public int? Pincode { get; set; }
        /// <summary>
        /// CreatedOn of the Tenant 
        /// </summary>
        public DateTime? CreatedOn { get; set; }
        /// <summary>
        /// CreatedBy of the Tenant 
        /// </summary>
        public Guid? CreatedBy { get; set; }
        /// <summary>
        /// UpdatedOn of the Tenant 
        /// </summary>
        public DateTime? UpdatedOn { get; set; }
        /// <summary>
        /// UpdatedBy of the Tenant 
        /// </summary>
        public Guid? UpdatedBy { get; set; }
        /// <summary>
        /// Collection navigation property representing associated 
        /// </summary>
        public ICollection<UserInRole>? UserInRole { get; set; }
        /// <summary>
        /// Collection navigation property representing associated 
        /// </summary>
        public ICollection<UserToken>? UserToken { get; set; }
        /// <summary>
        /// Collection navigation property representing associated 
        /// </summary>
        public ICollection<RoleEntitlement>? RoleEntitlement { get; set; }
        /// <summary>
        /// Collection navigation property representing associated 
        /// </summary>
        public ICollection<Entity>? Entity { get; set; }
        /// <summary>
        /// Collection navigation property representing associated 
        /// </summary>
        public ICollection<User>? User { get; set; }
        /// <summary>
        /// Collection navigation property representing associated 
        /// </summary>
        public ICollection<Role>? Role { get; set; }
    }
}
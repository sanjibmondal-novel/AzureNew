using Microsoft.AspNetCore.Mvc;
using AzureNew.Models;
using AzureNew.Data;
using AzureNew.Filter;
using AzureNew.Entities;
using AzureNew.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace AzureNew.Controllers
{
    /// <summary>
    /// Controller responsible for managing entity-related operations in the API.
    /// </summary>
    /// <remarks>
    /// This controller provides endpoints for adding, retrieving, updating, and deleting entity information.
    /// </remarks>
    [Route("api/entity")]
    [Authorize]
    public class EntityController : ControllerBase
    {
        private readonly AzureNewContext _context;

        public EntityController(AzureNewContext context)
        {
            _context = context;
        }

        /// <summary>Adds a new entity to the database</summary>
        /// <param name="model">The entity data to be added</param>
        /// <returns>The result of the operation</returns>
        [HttpPost]
        [UserAuthorize("Entity",Entitlements.Create)]
        public IActionResult Post([FromBody] Entity model)
        {
            _context.Entity.Add(model);
            var returnData = this._context.SaveChanges();
            return Ok(returnData);
        }

        /// <summary>Retrieves a list of entitys based on specified filters</summary>
        /// <param name="filters">The filter criteria in JSON format. Use the following format: [{"PropertyName": "PropertyName", "Operator": "Equal", "Value": "FilterValue"}] </param>
        /// <returns>The filtered list of entitys</returns>
        [HttpGet]
        [UserAuthorize("Entity",Entitlements.Read)]
        public IActionResult Get([FromQuery] string filters)
        {
            List<FilterCriteria> filterCriteria = null;
            if (!string.IsNullOrEmpty(filters))
            {
                filterCriteria = JsonHelper.Deserialize<List<FilterCriteria>>(filters);
            }

            var query = _context.Entity.IncludeRelated().AsQueryable();
            var result = FilterService<Entity>.ApplyFilter(query, filterCriteria);
            return Ok(result);
        }

        /// <summary>Retrieves a specific entity by its primary key</summary>
        /// <param name="entityId">The primary key of the entity</param>
        /// <returns>The entity data</returns>
        [HttpGet]
        [Route("{id:Guid}")]
        [UserAuthorize("Entity",Entitlements.Read)]
        public IActionResult GetById([FromRoute] Guid id)
        {
            var entityData = _context.Entity.IncludeRelated().FirstOrDefault(entity => entity.Id == id);
            return Ok(entityData);
        }

        /// <summary>Deletes a specific entity by its primary key</summary>
        /// <param name="entityId">The primary key of the entity</param>
        /// <returns>The result of the operation</returns>
        [HttpDelete]
        [UserAuthorize("Entity",Entitlements.Delete)]
        [Route("{id:Guid}")]
        public IActionResult DeleteById([FromRoute] Guid id)
        {
            var entityData = _context.Entity.IncludeRelated().FirstOrDefault(entity => entity.Id == id);
            if (entityData == null)
            {
                return NotFound();
            }

            _context.Entity.Remove(entityData);
            var returnData = this._context.SaveChanges();
            return Ok(returnData);
        }

        /// <summary>Updates a specific entity by its primary key</summary>
        /// <param name="entityId">The primary key of the entity</param>
        /// <param name="updatedEntity">The entity data to be updated</param>
        /// <returns>The result of the operation</returns>
        [HttpPut]
        [UserAuthorize("Entity",Entitlements.Update)]
        [Route("{id:Guid}")]
        public IActionResult UpdateById(Guid id, [FromBody] Entity updatedEntity)
        {
            if (id != updatedEntity.Id)
            {
                return BadRequest("Mismatched Id");
            }

            var entityData = _context.Entity.IncludeRelated().FirstOrDefault(entity => entity.Id == id);
            if (entityData == null)
            {
                return NotFound();
            }

            var propertiesToUpdate = typeof(Entity).GetProperties().Where(property => property.Name != "Id").ToList();
            foreach (var property in propertiesToUpdate)
            {
                property.SetValue(entityData, property.GetValue(updatedEntity));
            }

            var returnData = this._context.SaveChanges();
            return Ok(returnData);
        }
    }
}
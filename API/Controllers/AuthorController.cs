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
    /// Controller responsible for managing author-related operations in the API.
    /// </summary>
    /// <remarks>
    /// This controller provides endpoints for adding, retrieving, updating, and deleting author information.
    /// </remarks>
    [Route("api/author")]
    [Authorize]
    public class AuthorController : ControllerBase
    {
        private readonly AzureNewContext _context;

        public AuthorController(AzureNewContext context)
        {
            _context = context;
        }

        /// <summary>Adds a new author to the database</summary>
        /// <param name="model">The author data to be added</param>
        /// <returns>The result of the operation</returns>
        [HttpPost]
        [UserAuthorize("Author",Entitlements.Create)]
        public IActionResult Post([FromBody] Author model)
        {
            _context.Author.Add(model);
            var returnData = this._context.SaveChanges();
            return Ok(returnData);
        }

        /// <summary>Retrieves a list of authors based on specified filters</summary>
        /// <param name="filters">The filter criteria in JSON format. Use the following format: [{"PropertyName": "PropertyName", "Operator": "Equal", "Value": "FilterValue"}] </param>
        /// <returns>The filtered list of authors</returns>
        [HttpGet]
        [UserAuthorize("Author",Entitlements.Read)]
        public IActionResult Get([FromQuery] string filters)
        {
            List<FilterCriteria> filterCriteria = null;
            if (!string.IsNullOrEmpty(filters))
            {
                filterCriteria = JsonHelper.Deserialize<List<FilterCriteria>>(filters);
            }

            var query = _context.Author.IncludeRelated().AsQueryable();
            var result = FilterService<Author>.ApplyFilter(query, filterCriteria);
            return Ok(result);
        }

        /// <summary>Retrieves a specific author by its primary key</summary>
        /// <param name="entityId">The primary key of the author</param>
        /// <returns>The author data</returns>
        [HttpGet]
        [Route("{id:Guid}")]
        [UserAuthorize("Author",Entitlements.Read)]
        public IActionResult GetById([FromRoute] Guid id)
        {
            var entityData = _context.Author.IncludeRelated().FirstOrDefault(entity => entity.Id == id);
            return Ok(entityData);
        }

        /// <summary>Deletes a specific author by its primary key</summary>
        /// <param name="entityId">The primary key of the author</param>
        /// <returns>The result of the operation</returns>
        [HttpDelete]
        [UserAuthorize("Author",Entitlements.Delete)]
        [Route("{id:Guid}")]
        public IActionResult DeleteById([FromRoute] Guid id)
        {
            var entityData = _context.Author.IncludeRelated().FirstOrDefault(entity => entity.Id == id);
            if (entityData == null)
            {
                return NotFound();
            }

            _context.Author.Remove(entityData);
            var returnData = this._context.SaveChanges();
            return Ok(returnData);
        }

        /// <summary>Updates a specific author by its primary key</summary>
        /// <param name="entityId">The primary key of the author</param>
        /// <param name="updatedEntity">The author data to be updated</param>
        /// <returns>The result of the operation</returns>
        [HttpPut]
        [UserAuthorize("Author",Entitlements.Update)]
        [Route("{id:Guid}")]
        public IActionResult UpdateById(Guid id, [FromBody] Author updatedEntity)
        {
            if (id != updatedEntity.Id)
            {
                return BadRequest("Mismatched Id");
            }

            var entityData = _context.Author.IncludeRelated().FirstOrDefault(entity => entity.Id == id);
            if (entityData == null)
            {
                return NotFound();
            }

            var propertiesToUpdate = typeof(Author).GetProperties().Where(property => property.Name != "Id").ToList();
            foreach (var property in propertiesToUpdate)
            {
                property.SetValue(entityData, property.GetValue(updatedEntity));
            }

            var returnData = this._context.SaveChanges();
            return Ok(returnData);
        }
    }
}
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace AzureNew.Data
{
    public static class DbContextExtensions
    {
        public static IQueryable<TEntity> IncludeRelated<TEntity>(this IQueryable<TEntity> query) where TEntity : class
        {
            var includedProperties = GetIncludedProperties(typeof(TEntity));
            foreach (var property in includedProperties)
            {
                query = query.Include(property);
            }

            return query;
        }

        private static IEnumerable<string> GetIncludedProperties(Type entityType)
        {
            var foreignKeyProperties = entityType.GetProperties().Where(p => Attribute.IsDefined(p, typeof(ForeignKeyAttribute))).ToList();
            var includedProperties = new List<string>();
            foreach (var foreignKeyProperty in foreignKeyProperties)
            {
                includedProperties.Add(foreignKeyProperty.Name);
            }

            return includedProperties;
        }
    }
}
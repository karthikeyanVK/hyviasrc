
using System;

namespace Hyvia.API.Query
{
    public class ProductQuery
    {
        public Guid ProductId { get; set; }
        public string ProductTypeId { get; set; }
        public string ProductName { get; set; }
        public Guid ShopId { get; set; }
    }
}

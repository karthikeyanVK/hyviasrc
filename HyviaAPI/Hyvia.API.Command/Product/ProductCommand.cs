using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Hyvia.API.Command
{
    public class ProductCommand
    {
        //[BsonIgnoreIfDefault]
        public Guid ProductId { get; set; }
        public Guid ProductTypeId { get; set; }
        public Guid ShopId { get; set; }
        public string ProductName { get; set; }
        
    }
}

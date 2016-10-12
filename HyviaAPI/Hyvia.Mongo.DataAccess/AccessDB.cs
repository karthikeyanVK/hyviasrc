using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hyvia.Data.Model;
using MongoDB.Bson;
using MongoDB.Driver;
using System;

namespace Hyvia.Mongo.DataAccess
{
    public static class AccessDb
    {
         
        static IMongoDatabase _database;

        public static IMongoDatabase Db()
        {
            if (_database != null) return _database;
            IMongoClient client = new MongoClient("mongodb://hyviauser:data123@ds048368.mongolab.com:48368/hyvia-db");
            _database = client.GetDatabase("hyvia-db");
            return _database;
        }

        public static async Task<bool> Insert<T>(T document, string collectionName) 
        {
            var collection = Db().GetCollection<T>(collectionName);
            await collection.InsertOneAsync(document);

            return true;
        }
        public static async Task<Guid> Save<T>(T document, string collectionName, string primaryKeyName)
        {
            var primaryKeyProperty = document.GetType().GetProperty(primaryKeyName);
            string primaryKey = (string)primaryKeyProperty.GetValue(document, null);
            if (string.IsNullOrEmpty(primaryKey) || primaryKey == Guid.Empty.ToString())
            {
                primaryKey = Guid.NewGuid().ToString();
                document.GetType().GetProperty(primaryKeyName).SetValue(document, primaryKey);
                await AccessDb.Insert(document, collectionName);

            }
            else
            {
                // await AccessDb.Insert(product, MongoTables.ProductTableName);
                await AccessDb.Update(document, collectionName, primaryKeyName, primaryKey.ToString());
                
            }

            return Guid.Parse(primaryKey);
        }
        public static async Task<bool> Update<T>(T document, string collectionName,string primaryKeyName, string primaryId)
        {
            var collection = Db().GetCollection<T>(collectionName);

            var property = document.GetType().GetProperty(primaryKeyName);
            var filter = Builders<T>.Filter.Eq(primaryKeyName, primaryId);
            //TODO: Try upsert with update
            await collection.ReplaceOneAsync(filter,document);
            
            return true;

        }

        //private static bool FilterQuery<T>(T document, string primaryKeyName, string primaryId)
        //{
        //    return (string)document.GetType().GetProperty(primaryKeyName).GetValue(document, null) == primaryId;

        //}

        public static async Task<IList> GetListOf<TDocument>(SearchData searchData, string fromCollection) where TDocument : BsonDocument
        {
            var collection = Db().GetCollection<BsonDocument>(fromCollection);
            
            FilterDefinition<BsonDocument> filter = new BsonDocument();
            if (searchData != null)
            {
                 filter = Builders<BsonDocument>.Filter.Eq(searchData.SearchField, searchData.SearchValue.First());
                
            }
            
            return await collection.Find(filter).ToListAsync();
            
        }
        public static async Task<IList<T>> GetListOf<T>( string fromCollection)
        {
            var collection = Db().GetCollection<T>(fromCollection);

            return await collection.Find(_ => true).ToListAsync();
        }
        public static async Task<IList<T>> GetListWithFilter<T>(IList<SearchData> searchDataList, string fromCollection)
        {
            var collection = Db().GetCollection<T>(fromCollection);
            FilterDefinition<T> filter = new BsonDocument();
            
            if (searchDataList != null && searchDataList.Count > 0)
            {

                foreach (var searchData in searchDataList)
                {
                    var searchValue = searchData.SearchValue.First().Trim();
                    if (string.IsNullOrEmpty(searchValue))
                        continue;
                    string filterQuery = string.Format("/{0}/i", searchValue);
                    filter =
                    Builders<T>.Filter.Regex(searchData.SearchField, filterQuery) & filter;
                    //  filter = Builders<BsonDocument>.Filter.ElemMatch
                }
            }
            
            var result = await collection.Find(filter).ToListAsync();
            //var result = await collection.Find(_ => true).ToListAsync();
            return result;
        }
    }
}
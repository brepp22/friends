/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('pets').truncate()
  await knex('pets').insert([
    {pet_id: 1 , img: "https://cdn.create.vista.com/api/media/small/287225044/stock-photo-happy-friendly-brown-big-dog" , 
      petname: "Fluffy" , breed: "Pitbull" , weight: 57, color: "Brown", 
      bio: "Fluffy is a sweet girl with a spunky personality. Loves to go on hikes and long walks on the beach."},
    {pet_id: 2, img: "https://www.shutterstock.com/image-photo/adult-orange-american-shorthair-cat-600nw-2264511137.jpg",
      petname: "Dash" , breed: "American Wirehair" , weight: 8, color: "Orange", 
      bio: "Dash is a curious and cuddly companion. Loves to hang out with the family."}
  ]);
};

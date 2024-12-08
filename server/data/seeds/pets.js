/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('pets').truncate()
  await knex('pets').insert([
    {pet_id: 1 , img: "https://images.pexels.com/photos/28931358/pexels-photo-28931358/free-photo-of-adorable-pitbull-sitting-indoors-in-british-columbia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" , 
      petname: "Fluffy" , breed: "Pitbull" , weight: 57, color: "Brown", 
      bio: "Fluffy is a sweet girl with a spunky personality. Loves to go on hikes and long walks on the beach."},
    {pet_id: 2, img: "https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      petname: "Dash" , breed: "Tabby" , weight: 8, color: "Silver", 
      bio: "Dash is a curious and cuddly companion. Loves to hang out with the family."},
    {pet_id: 3, img: "https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      petname: "Boulder" , breed: "French Bulldog" , weight: 27, color: "Cream", 
      bio: "Boulder is a free spirit with a lot of charm. Loves to cuddle and go on car rides."}
  ]);
};

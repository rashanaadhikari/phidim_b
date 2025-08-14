import { Skill } from "../models/index.js";



const createSkillService = async(skills)=>{
 
    
        
    if(!skills || !Array.isArray(skills) || skills.length === 0) {
        throw new Error("skill is required and should be an array");
    }
    if (skills.length < 1) {
        throw new Error("Only one skill can be created at a time");
    }

//   const result = await Promise.all(
//   skills.map(async (skill) => {
//     const isExist = await Skill.findOne({ where: { name: skill } });
//     if (!isExist) {
//       return Skill.create({ name: skill });
//     }
//     return isExist; 
//   })
// );
    const result = await Skill.bulkCreate(
  skills.map((name) => ({ name })),
  { ignoreDuplicates: true }
);

    return result
   
    
}


const getAllSkillsService = async ()=>{
    return Skill.findAll();
}
const getSkillByIdService = async (id)=>{
    return Skill.findByPk(id);
}

const updateSkillService = async (id, skillData)=>{
    console.log("the id is ",id,skillData)
    const skill = await Skill.findByPk(id);
    console.log(skill)
    if (!skill) {
        throw new Error("Skill not found");
    }
    return skill.update({name:skillData});
}

const deleteSkillService = async (id)=>{
  
     const skill = await Skill.findByPk(id);
    
    if (!skill) {
        throw new Error("Skill not found");
    }
    return await skill.destroy();
}

export {
    createSkillService,
    getAllSkillsService,
    getSkillByIdService,
    updateSkillService,
    deleteSkillService
}

import Settings from "@/app/(models)/Settings";

const SettingsProvider = async () => {

  const data = await Settings.findOne();
  
  const settings = JSON.parse(JSON.stringify(data))
  
  return settings

}

export default SettingsProvider

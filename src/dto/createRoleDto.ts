import { IsString } from "class-validator";

class CreateRoleDto {
  @IsString()
  public description: string;
}

export default CreateRoleDto;

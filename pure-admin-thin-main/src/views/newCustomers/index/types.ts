type IFileList = {
  name: string;
  url: string;
}

export type IRuleForm = {
  meetingResult: number; // 审批结果
  meetingLog: string; // 会议记录
  fileList: IFileList[]; // 会议附件
}
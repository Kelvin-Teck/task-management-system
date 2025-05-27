interface IMailData<T> {
  to: string;
  subject: string;
  template: string;
  context: T;
}

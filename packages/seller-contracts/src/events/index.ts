export type EventPayloads = {
  'auth:login-success:v1': { userId: string; role: string };
  'auth:logout:v1': undefined;
};
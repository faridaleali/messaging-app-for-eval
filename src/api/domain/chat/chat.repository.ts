import { HttpService } from "../../baseRepositories/api/http/axios/axios-http-service";
import ApiRepository from "../../baseRepositories/api/respository";
import { RequestData } from "../../http/Http";
import Paginated from "../../types/paginated";

export default class ChatRepository extends ApiRepository {
  constructor() {
    super("messages");
  }

  public async getEvents<T>(
    limit: number,
    offset: number,
  ): Promise<Paginated<T>> {
    const data: RequestData = {
      endpoint: `${this.endpoint}`,
      params: { limit, offset },
    };

    return HttpService.getAsync(data);
  }

  public async sendTextMessage<T>(text: string): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/send-text`,
      body: { text },
    };

    return HttpService.postAsync(data);
  }

  public async sendImageMessage<T>(
    imageUri: string,
    imageName: string,
    imageSize: number,
  ): Promise<T> {
    const formData = new FormData();

    // Para web: fetch el blob de la URI
    if (imageUri.startsWith("blob:") || imageUri.startsWith("data:")) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      formData.append("image", blob, imageName);
    } else {
      // Para React Native
      const imageFile = {
        uri: imageUri,
        type: "image/jpeg",
        name: imageName,
      } as unknown as Blob;
      formData.append("image", imageFile);
    }

    formData.append("imageName", imageName);
    formData.append("imageSize", imageSize.toString());

    const data: RequestData = {
      endpoint: `${this.endpoint}/send-image`,
      body: formData,
    };

    return HttpService.postAsync(data);
  }
}

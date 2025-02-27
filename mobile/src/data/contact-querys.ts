import { IContactDto } from "../dtos/contact-dto";
import { api } from "../lib/api-client";

export async function getContacts(query: string) {
  const { data } = await api.get("/contacts", {
    params: {
      name_like: query,
    },
  });
  return data;
}

export async function getContactById(id: string | string[]) {
  const { data } = await api.get("/contacts", {
    params: {
      id: id,
    },
  });
  return data;
}

export async function createContact(newContact: Omit<IContactDto, "id">) {
  const { data } = await api.post("/contacts", newContact);
  return data;
}

export async function updateContact({
  id,
  updatedContact,
}: {
  id: number;
  updatedContact: Omit<IContactDto, "id">;
}) {
  const { data } = await api.put(`/contacts/${id}`, updatedContact);
  return data;
}

export async function deleteContact(id: number) {
  await api.delete(`/contacts/${id}`);
}

import { HttpClient } from "@angular/common/http";
import { Pager } from "@models/pager/pager.model";
import { Observable } from "rxjs";
import { Pageable } from "@models/pager/pageable.model";
import { Group } from "@models/group.model";
import { Injectable } from "@angular/core";
import { User } from "@models/user.model";

@Injectable({
  providedIn: 'root'
})
export class GroupRestService {

  constructor(private http: HttpClient) {
  }

  getGroups(pager: Pager): Observable<Pageable<Group>> {
    return this.http.post<Pageable<Group>>('group/list', pager);
  }

  getGroup(iID: string): Observable<Group> {
    return this.http.get<Group>('group/' + iID);
  }

  getGroupUser(id: string): Observable<User[]> {
    return this.http.get<User[]>('group/' + id + '/users');
  }

  addGroup(iGroup: Group): Observable<Group> {
    return this.http.post<Group>('group', iGroup);
  }

  updateGroup(iGroup: Group): Observable<Group> {
    return this.http.put<Group>('group', iGroup);
  }

  deleteGroup(iID: string): Observable<void> {
    return this.http.delete<void>('group/' + iID);
  }
}

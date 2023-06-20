import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: any[] | null = null;

  constructor(private userService: UserService, private toast: ToastrService ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
        (response: any[] | null) => {
        this.users = response;
        console.log(response);
      },
        (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  addUser() {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com'
      // Autres propriétés de l'utilisateur
    };

    this.userService.addUser(newUser).subscribe(
        (response: any) => {
        console.log('User added successfully', response);
          this.toast.success('User added successfully');
          this.getAllUsers(); // Actualisez la liste des utilisateurs après l'ajout
      },
        (error: any) => {
        console.error('Error adding user', error);
      }
    );
  }

  deleteUser(user: any) {
    this.userService.deleteUserById(user.id).subscribe(
        (response: any) => {
        console.log('User deleted successfully', response);
        this.toast.success('User deleted successfully');
        this.getAllUsers(); // Actualisez la liste des utilisateurs après la suppression
      },
        (error: any) => {
          this.toast.error('Error deleting user');
        console.error('Error deleting user', error);
      }
    );
  }

  updateUser(user: any) {
    this.userService.updateUser(user).subscribe(
        (response: any) => {
        console.log('User updated successfully', response);
        this.toast.success('User updated successfully');
        this.getAllUsers(); // Actualisez la liste des utilisateurs après la mise à jour
      },
        (error: any) => {
        this.toast.error('Error updating user');
        console.error('Error updating user', error);
      }
    );
  }
  selectedUser: any;

  editUser(user: any) {
    this.selectedUser = user;
    // Vous pouvez implémenter ici la logique pour afficher un formulaire de modification ou une boîte de dialogue
    // pour permettre à l'utilisateur de modifier les détails de l'utilisateur sélectionné.
  }

}

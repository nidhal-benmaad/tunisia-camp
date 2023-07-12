import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import {MtxGridColumn} from "@ng-matero/extensions/grid";
import {ReservationService} from "../reservations.service";
import {PageEvent} from "@angular/material/paginator";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'ID', field: 'id' },
    { header: 'Nom', field: 'firstName' },
    { header: 'lastN', field: 'lastName' },
    { header: 'Email', field: 'email' }
    ,
    {
      header: this.translate.stream('table_kitchen_sink.operation'),
      field: 'operation',
      minWidth: 160,
      width: '160px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('table_kitchen_sink.edit'),
          click: record => this.editUser(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('table_kitchen_sink.delete'),
          tooltip: this.translate.stream('table_kitchen_sink.delete'),
          pop: {
            title: this.translate.stream('table_kitchen_sink.confirm_delete'),
            closeText: this.translate.stream('table_kitchen_sink.close'),
            okText: this.translate.stream('table_kitchen_sink.ok'),
          },
          click: record => this.deleteUser(record),

        },
        {
          color: 'warn',
          icon: 'check',
          text: this.translate.stream('table_kitchen_sink.validate'),
          tooltip: this.translate.stream('validate'),
          pop: {
            title: this.translate.stream('validate ?'),
            closeText: this.translate.stream('table_kitchen_sink.close'),
            okText: this.translate.stream('table_kitchen_sink.ok'),
          },

          click: (record: any) => this.validateUser(record),

        },


      ],
    },
  ];

  list: any[] = [];
  total = 0;
  isLoading = true;

  query = {
    q: '',
    page: 0,
    size: 3,
  };

  get params() {
    const p = Object.assign({}, this.query);

    return p;
  }

  constructor(private userService: UserService,
              private cdr: ChangeDetectorRef ,
              private toast: ToastrService,
              private translate: TranslateService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.isLoading = true;

    this.userService.getAllUsers().subscribe(
      res => {
        console.log('res', res);
        this.list = res;
        //this.total = res.totalElements;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    );
  }


  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.size = e.pageSize;
    this.getAllUsers();
  }

  search() {
    this.isLoading = true; // Afficher l'indicateur de chargement

    this.userService.getPendingUsers().subscribe(
      res => {
        console.log('res', res);
        this.list = res;
        this.total = res.length; // Mettez à jour le total avec la longueur de la liste renvoyée
        this.isLoading = false; // Masquer l'indicateur de chargement
        this.cdr.detectChanges();
      },
      error => {
        console.error(error);
        this.isLoading = false; // Masquer l'indicateur de chargement en cas d'erreur
        this.cdr.detectChanges();
      }
    );
  }

  validateUser(user: any) {
    this.userService.validateUser(user.id).subscribe(
      (response: any) => {
        console.log('User validated successfully', response);
        this.toast.success('User validated successfully');
        user.validated = true; // Mettez à jour l'état de validation de l'utilisateur dans la liste
      },
      (error: any) => {
        this.toast.error('Error validating user');
        console.error('Error validating user', error);
      }
    );
  }

  reset() {
    this.query.q = '';
    this.query.page = 0;
    this.query.size = 3;
    this.getAllUsers();
  }
  deleteUser(user: any) {
    this.userService.deleteUserById(user.id).subscribe(
      (response: any) => {
        console.log('User deleted successfully', response);
        this.toast.success('User deleted successfully');
        this.getAllUsers(); // Refresh the user list after deletion
      },
      (error: any) => {
        this.toast.error('Error deleting user');
        console.error('Error deleting user', error);
      }
    );
  }
  // updateUser(user: any) {
  //   this.userService.updateUser(user).subscribe(
  //     (response: any) => {
  //       console.log('User updated successfully', response);
  //       this.toast.success('User updated successfully');
  //       this.getAllUsers(); // Refresh the user list after update
  //     },
  //     (error: any) => {
  //       this.toast.error('Error updating user');
  //       console.error('Error updating user', error);
  //     }
  //   );
  // }
  editUser(user: any) {
    // You can implement the logic here to display a modification form or a dialog
    // to allow the user to edit the details of the selected user.
  }


}


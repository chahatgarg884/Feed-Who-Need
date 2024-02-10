create database codecomets;
use codecomets;
create table donors(emailid varchar(30) Primary key, name varchar(20),contact varchar(10),address varchar(100),city varchar(30),id varchar(50),fileName varchar(100));
select * from donors;
create table foodavailable( srno int auto_increment primary key, name varchar(30),food varchar(30),qty int,packing varchar(20),dos date,status int);
select * from foodavailable;
create table user(email varchar(30) Primary key,pwd varchar(20),type1 varchar(20),dos date,status int);
select * from user;
create table volunteer(emailid varchar(30) Primary key, name varchar(20),contact varchar(10),address varchar(100),city varchar(30),id varchar(50),fileName varchar(100));
select * from volunteer;


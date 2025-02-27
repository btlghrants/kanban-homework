FROM docker.io/library/ubuntu:24.04

ARG USER=kbh

RUN <<NUR
  # change container user/group to something project specific
  OLD=ubuntu

  groupmod --new-name $USER $OLD
  usermod --move-home --home /home/$USER --gid $USER --login $USER $OLD

  # update container user password
  echo "$USER:password" | chpasswd
  
  # authorized passwordless sudo for container user
  apt-get update
  apt-get install -y sudo
  
  echo $USER ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USER
  chmod 0440 /etc/sudoers.d/$USER
  touch /home/$USER/.sudo_as_admin_successful

  # store terminal history on host (so lives across container restarts)
  BASHRC="/home/$USER/.bashrc"
  echo "" >> "$BASHRC"
  echo "export HISTFILE=/code/.runstate/.bash_history" >> "$BASHRC"
  echo "export PROMPT_COMMAND='history -a'" >> "$BASHRC"

  # enable bash autocompletion
  apt install --yes bash-completion
NUR

RUN <<NUR
  apt install --yes git jq

  # https://stackoverflow.com/questions/28405902/how-to-set-the-locale-inside-a-debian-ubuntu-docker-container
  apt install --yes locales
  locale-gen "en_US.UTF-8"
NUR

RUN <<NUR
  # install psql CLI (so we can script against it!)
  # https://www.sqlpassion.at/archive/2024/10/14/comprehensive-guide-setting-up-postgresql-17-on-ubuntu-24-04/
  apt install --yes wget gnupg2 lsb-release
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
  echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list
  apt install --yes curl gnupg2 lsb-release
  apt update
  apt install --yes postgresql-client-17
NUR

RUN <<NUR
  # install node
  # https://nodejs.org/en/download
  sudo -u "$USER" bash -c 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash'
  sudo -u "$USER" bash -c '. ~/.nvm/nvm.sh && nvm install 22'
NUR

WORKDIR /code/ui
EXPOSE 3000